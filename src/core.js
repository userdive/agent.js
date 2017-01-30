/* @flow */
import mitt from 'mitt'
import cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import Logger from './logger'
import Store from './store'
import { get, obj2query } from './requests'
import { VERSION as v, INTERVAL } from './constants'
import warning from './warning'

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

let baseUrl: string
let delay: number
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
  if (data.x > 0 && data.y > 0 &&
    data.type && data.time > 0 &&
    typeof data.left === 'number' && typeof data.top === 'number') {
    return true
  }
  return false
}

function findOrCreateClientId (name: string): string {
  const c = cookies.get(name)
  if (c) {
    return c
  }
  return uuid().replace(/-/g, '')
}

function getIntervalTime (): number {
  if (INTERVAL.length) {
    delay = INTERVAL.shift()
  }
  return delay
}

function now2elapsed (saveTime: number): number {
  return parseInt((saveTime - loadTime) / 1000, 10)
}

function createInteractData (data: Interact): string {
  return `${data.type},${now2elapsed(data.time)},${data.x},${data.y},${data.left},${data.top}`
}

function getInteractTypes (eventName: EventType): string[] {
  const types = []
  switch (eventName) {
    case 'click':
      return types.concat(['l', 'a'])
  }
  return types
}

function updateInteractCache (data: Object): void {
  if (cacheValidator(data)) {
    const types = getInteractTypes(data.type)
    types.forEach(type => {
      cache[type] = Object.assign({}, data, {type})
    })
  }
}

function sendInteracts (): void {
  if (!cache) {
    return
  }

  Object.keys(cache).forEach(key => {
    interacts.push(Object.assign({}, cache[key], {
      time: Date.now()
    }))
  })

  const query: string[] = []
  interacts.forEach(data => {
    query.push(`d=${createInteractData(data)}`)
  })

  // TODO validate query string
  if (query.length > 2) {
    get(`${baseUrl}/${loadTime}/interact/${eventId}.gif`, query)
    interacts.length = 0
    eventId++
  }
  if (loadTime) {
    setTimeout(sendInteracts, getIntervalTime() * 1000)
  }
}

export default class Agent extends Store {
  logger: Logger
  loaded: boolean
  constructor (id: string, eventsClass: any[], opt: Options): void {
    super()
    baseUrl = `${opt.baseUrl}/${id}/${findOrCreateClientId(opt.cookieName)}`
    emitter = mitt()
    this.logger = new Logger(opt.Raven)
    eventsClass.forEach(Class => {
      events.push(new Class(EMIT_NAME, emitter, this.logger))
    })
  }
  send (type: SendType): void {
    switch (type) {
      case 'pageview':
        let resourceSize
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
              v,
              sh: screenSize.h,
              sw: screenSize.w,
              wh: windowSize.h,
              ww: windowSize.w,
              h: resourceSize.h,
              w: resourceSize.w
            }
          })(getWindowSize(window), getScreenSize(screen))
        })
        const data = Object.assign({}, state.env, state.custom)

        loadTime = Date.now()
        get(`${baseUrl}/${loadTime}/env.gif`, obj2query(data))
        this.loaded = true
        this.listen()
    }
  }
  destroy (): void {
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
    sendInteracts()
  }
}
