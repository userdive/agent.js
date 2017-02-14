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
  Options,
  SendType,
  State
} from './types'

const EMIT_NAME = 'POINT'

let INTERVAL: number[]
let baseUrl: string
let emitter: mitt
let eventId: number = 1
let loadTime: number = 0
let stop: boolean = false

let cache: {
  l: Object,
  a: Object
}

const interacts: Interact[] = []
const events: any[] = []

function cacheValidator (data: Object): boolean {
  if (data.x >= 0 && data.y >= 0 && data.type &&
    typeof data.left === 'number' && typeof data.top === 'number') {
    return true
  }
  return false
}

function findOrCreateClientId (opt: Options): string {
  const c = cookies.get(opt.cookieName)
  if (c) {
    return c
  }
  const id = uuid().replace(/-/g, '')
  cookies.set(opt.cookieName, id, { domain: opt.cookieDomain, expires: opt.cookieExpires })

  return id
}

function toInt (n: number) {
  return parseInt(n, 10)
}

function createInteractData (d: Interact): string {
  if (!cacheValidator(d)) {
    return ''
  }

  const time: number = toInt((d.time - loadTime) / 1000, 10)
  if (time < 0) {
    return ''
  }
  return `${d.type},${time},${toInt(d.x)},${toInt(d.y)},${toInt(d.left)},${toInt(d.top)}`
}

function getInteractTypes (eventName: EventType): string[] {
  switch (eventName) {
    case 'click':
      return ['l', 'a']
    case 'scroll':
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
    warning(`failed ${data.type}`, `{x: ${data.x}, y: ${data.y}, top: ${data.top}, lelt: ${data.left}}`)
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
    get(`${baseUrl}/${loadTime}/interact/${eventId}.gif`, query)
    interacts.length = 0
    eventId++
  }
}

function sendInteractsWithUpdate (): void {
  Object.keys(cache).forEach(key => {
    interacts.push(Object.assign({}, cache[key], {
      time: Date.now()
    }))
  })

  sendInteracts()

  if (loadTime && !stop) {
    const delay = INTERVAL.shift()
    if (delay >= 0) {
      setTimeout(sendInteractsWithUpdate, delay * 1000)
    }
  }
}

export default class Agent extends Store {
  loaded: boolean
  constructor (id: string, eventsClass: any[], opt: Options): void {
    super()
    setup(opt.RAVEN_DSN, opt.Raven)
    baseUrl = `${opt.baseUrl}/${id}/${findOrCreateClientId(opt)}`
    emitter = mitt()
    const observer = new UIEventObserver() // singleton
    eventsClass.forEach(Class => {
      events.push(new Class(EMIT_NAME, emitter, observer))
    })
  }
  send (type: SendType): void {
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
        const data = Object.assign({}, state.env, state.custom)

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
    cache = {
      a: {},
      l: {}
    }
    loadTime = 0
  }
  listen (): void {
    if (!this.loaded || !loadTime) {
      raise('need send pageview')
      return
    }
    cache = {
      a: {},
      l: {}
    }
    emitter.on(EMIT_NAME, updateInteractCache)
    events.forEach(e => {
      e.on()
    })
    sendInteractsWithUpdate()
  }
}
