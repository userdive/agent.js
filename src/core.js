/* @flow */
import EventEmitter from 'events'
import { UIEventObserver } from 'ui-event-observer'
import { find, save } from 'auto-cookie'
import cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import { setup, raise, warning } from './logger'
import Store from './store'
import { get, obj2query } from './requests'

import {
  INTERVAL as INTERVAL_DEFAULT_SETTING,
  INTERACT as MAX_INTERACT
} from './constants'

import { getEnv } from './browser'

import type {
  EventType,
  Interact,
  SendType,
  Settings,
  State
} from './types'

const EMIT_NAME = 'POINT'

let BASE_URL: string
let emitter: EventEmitter
let interactId: number = 0
let INTERVAL: number[]
let loadTime: number = 0
let stop: boolean = false

let cache: {
  l: Object,
  a: Object
}

const interacts: Interact[] = []
const events: any[] = []

function clearCache (): void {
  cache = {
    a: {},
    l: {}
  }
}

function generateId () {
  return uuid().replace(/-/g, '')
}

function findOrCreateClientId (cookieName: string, cookieDomain: string, cookieExpires: ?number): string {
  const options = {domain: cookieDomain, expires: cookieExpires}
  const c = cookies.get(cookieName, options)
  if (c) {
    return c
  }
  cookies.set(cookieName, generateId(), options)
  return cookies.get(cookieName, options)
}

function findOrCreateClientIdAuto (cookieName: string, cookieExpires) {
  const c = find(cookieName, cookieExpires)
  if (c) {
    return c
  }
  return save(cookieName, generateId(), cookieExpires)
}

function cacheValidator (data: Object): boolean {
  if (data.x >= 0 && data.y >= 0 && data.type &&
    typeof data.left === 'number' && typeof data.top === 'number') {
    return true
  }
  return false
}

function toInt (n: number) {
  return parseInt(n, 10)
}

function createInteractData (d: Interact): string {
  if (!cacheValidator(d)) {
    return ''
  }
  return `${d.type},${d.id},${toInt(d.x)},${toInt(d.y)},${toInt(d.left)},${toInt(d.top)}`
}

function getInteractTypes (eventName: EventType): string[] {
  switch (eventName) {
    case 'click':
    case 'touchend':
      return ['l', 'a']
    case 'scroll':
    case 'mousemove':
      return ['l']
  }
  return []
}

function updateInteractCache (data: Object): void {
  if (cacheValidator(data) && !stop) {
    const types = getInteractTypes(data.type)
    types.forEach(type => {
      cache[type] = Object.assign({}, data, {type})
    })
  } else {
    warning(`failed ${data.type}`, data)
    stop = true
  }
}

function sendInteracts (force: ?boolean): void {
  const query: string[] = []
  interacts.forEach(data => {
    const q = createInteractData(data)
    if (q.length) {
      query.push(`d=${q}`)
    }
  })

  if (BASE_URL && loadTime && (query.length >= MAX_INTERACT || force)) {
    get(`${BASE_URL}/${loadTime}/int.gif`, query)
    interacts.length = 0
  }
}

function sendInteractsWithUpdate (): void {
  Object.keys(cache).forEach(key => {
    if (cacheValidator(cache[key])) {
      interacts.push(Object.assign({}, cache[key], {
        id: interactId
      }))
    }
  })

  clearCache()
  sendInteracts()

  if (loadTime && !stop) {
    const delay = INTERVAL.shift()
    if (delay >= 0) {
      setTimeout(sendInteractsWithUpdate, delay * 1000)
    }
    interactId++
  }
}

export default class Agent extends Store {
  loaded: boolean
  constructor (id: string, eventsClass: any[], {RAVEN_DSN, Raven, baseUrl, cookieDomain, cookieExpires, cookieName, auto}: Settings): void {
    super()
    setup(RAVEN_DSN, Raven)
    emitter = new EventEmitter()
    const observer = new UIEventObserver() // singleton
    eventsClass.forEach(Class => {
      events.push(new Class(EMIT_NAME, emitter, observer))
    })
    let userId
    if (auto) {
      userId = findOrCreateClientIdAuto(cookieName, cookieExpires)
    } else {
      userId = findOrCreateClientId(cookieName, cookieDomain, cookieExpires)
    }
    if (id && userId) {
      BASE_URL = `${baseUrl}/${id}/${userId}`
    }
  }
  send (type: SendType, page: string): void {
    switch (type) {
      case 'pageview':
        const env = getEnv(page)
        if (!env || !BASE_URL) {
          return warning(`failed init`)
        }

        const state: State = this.merge({
          type: 'env',
          data: env
        })

        INTERVAL = INTERVAL_DEFAULT_SETTING.concat()
        interactId = 0
        const data = Object.assign({}, state.env, state.custom)
        loadTime = Date.now()
        get(`${BASE_URL}/${loadTime}/env.gif`, obj2query(data))
        this.loaded = true
        this.listen()
    }
  }
  destroy (): void {
    sendInteracts(true)

    emitter.removeListener(EMIT_NAME, updateInteractCache)
    events.forEach(e => {
      e.off()
    })
    this.loaded = false
    clearCache()
    loadTime = 0
  }
  listen (): void {
    if (!this.loaded || !loadTime) {
      raise('need send pageview')
      return
    }
    clearCache()
    emitter.on(EMIT_NAME, updateInteractCache)
    events.forEach(e => {
      e.on()
    })
    sendInteractsWithUpdate()
  }
}
