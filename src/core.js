/* @flow */
import mitt from 'mitt'
import { UIEventObserver } from 'ui-event-observer'
import cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import Logger from './logger'
import Store from './store'
import { get, obj2query } from './requests'
import warning from './warning'

import {
  INTERVAL as INTERVAL_DEFAULT_SETTING,
  INTERACT as MAX_INTERACT,
  VERSION
} from './constants'

import {
  getWindowSize,
  getResourceSize,
  getScreenSize
} from './browser'

import type {
  ClientEnvironmentsData,
  EventType,
  Interact,
  Options,
  SendType,
  Size,
  State
} from './types'

const EMIT_NAME = 'POINT'

let INTERVAL: number[]
let baseUrl: string
let emitter: mitt
let eventId: number = 1
let loadTime: number = 0

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
  if (cacheValidator(data)) {
    const types = getInteractTypes(data.type)
    types.forEach(type => {
      cache[type] = Object.assign({}, data, {type})
    })
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

  if (loadTime) {
    const delay = INTERVAL.shift()
    if (delay >= 0) {
      setTimeout(sendInteractsWithUpdate, delay * 1000)
    }
  }
}

export default class Agent extends Store {
  logger: Logger
  loaded: boolean
  constructor (id: string, eventsClass: any[], opt: Options): void {
    super()
    baseUrl = `${opt.baseUrl}/${id}/${findOrCreateClientId(opt)}`
    emitter = mitt()
    this.logger = new Logger(opt.Raven)
    const observer = new UIEventObserver() // singleton
    eventsClass.forEach(Class => {
      events.push(new Class(EMIT_NAME, emitter, observer, this.logger))
    })
  }
  send (type: SendType): void {
    switch (type) {
      case 'pageview':
        let resourceSize: {h: number, w: number}
        try {
          resourceSize = getResourceSize(document)
        } catch (err) {
          this.logger.error(err)
          return
        }

        const state: State = this.merge({
          type: 'env',
          data: ((windowSize: Size, screenSize: Size): ClientEnvironmentsData => {
            return {
              v: VERSION,
              sh: screenSize.h,
              sw: screenSize.w,
              wh: windowSize.h,
              ww: windowSize.w,
              h: resourceSize.h,
              w: resourceSize.w
            }
          })(getWindowSize(window), getScreenSize(screen))
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
      warning('need send pageview')
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
