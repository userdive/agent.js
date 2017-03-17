/* @flow */
import mitt from 'mitt'
import { UIEventObserver } from 'ui-event-observer'
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
  SendOptions,
  SendType,
  Settings,
  State
} from './types'

const EMIT_NAME = 'POINT'

let baseUrl: string
let emitter: mitt
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

function cacheValidator (data: Object): boolean {
  if (data.x >= 0 && data.y >= 0 && data.type &&
    typeof data.left === 'number' && typeof data.top === 'number') {
    return true
  }
  return false
}

function findOrCreateClientId (settings: Settings): string {
  const c = cookies.get(settings.cookieName)
  if (c) {
    return c
  }
  const id = uuid().replace(/-/g, '')
  cookies.set(settings.cookieName, id, { domain: settings.cookieDomain, expires: settings.cookieExpires })

  return id
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

  if (query.length >= MAX_INTERACT || force) {
    get(`${baseUrl}/${loadTime}/int.gif`, query)
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
  settings: Settings
  constructor (eventsClass: any[], settings: Settings): void {
    super()
    setup(settings.RAVEN_DSN, settings.Raven)
    emitter = mitt()
    const observer = new UIEventObserver() // singleton
    eventsClass.forEach(Class => {
      events.push(new Class(EMIT_NAME, emitter, observer))
    })
    this.settings = settings
  }
  send (type: SendType, options: SendOptions): void {
    switch (type) {
      case 'pageview':
        const env = getEnv()
        if (!env) {
          return
        }

        const state: State = this.merge({
          type: 'env',
          data: env
        })

        INTERVAL = INTERVAL_DEFAULT_SETTING.concat()
        interactId = 0
        const data = Object.assign({}, state.env, state.custom)
        const { settings } = this

        baseUrl = `${settings.baseUrl}/${settings.id}/${findOrCreateClientId(settings)}`
        loadTime = Date.now()
        get(`${baseUrl}/${loadTime}/env.gif`, obj2query(data))
        this.loaded = true
        this.listen()
    }
  }
  destroy (): void {
    sendInteracts(true)

    emitter.off('*', updateInteractCache)
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
