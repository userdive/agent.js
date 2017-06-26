/* @flow */
import EventEmitter from 'events'
import { UIEventObserver } from 'ui-event-observer'
import { find, save } from 'auto-cookie'
import cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import { get, obj2query } from './requests'
import { getEnv } from './browser'
import { setup, raise, warning } from './logger'
import {
  INTERVAL as INTERVAL_DEFAULT_SETTING,
  INTERACT as MAX_INTERACT
} from './constants'
import Store from './store'

import type { EventType, Interact, SendType, Settings, State } from './types'

function generateId () {
  return uuid().replace(/-/g, '')
}

function findOrCreateClientId (
  cookieName: string,
  cookieDomain: string,
  cookieExpires: ?number
): string {
  const options = { domain: cookieDomain, expires: cookieExpires }
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

function cacheValidator ({ x, y, type, left, top }: Object): boolean {
  if (
    x > 0 &&
    y > 0 &&
    type &&
    typeof left === 'number' &&
    left >= 0 &&
    typeof top === 'number' &&
    top >= 0
  ) {
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
  return `${d.type},${d.id},${toInt(d.x)},${toInt(d.y)},${toInt(
    d.left
  )},${toInt(d.top)}`
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

export default class AgentCore extends Store {
  _baseUrl: string
  _cache: { a: Object, l: Object }
  _emitter: EventEmitter
  _events: any[]
  _interactId: number
  _interacts: Interact[]
  _interval: number[]
  _loadTime: number
  active: boolean
  id: string
  constructor (
    id: string,
    eventsClass: any[],
    {
      RAVEN_DSN,
      Raven,
      baseUrl,
      cookieDomain,
      cookieExpires,
      cookieName,
      auto
    }: Settings
  ): void {
    super()
    setup(RAVEN_DSN, Raven)

    this.id = generateId()
    this._clear()
    this._events = []
    this._interacts = []
    this._interval = []
    this._interactId = 0
    this._emitter = new EventEmitter()

    const observer = new UIEventObserver() // singleton
    eventsClass.forEach(Class => {
      this._events.push(new Class(this.id, this._emitter, observer))
    })
    let userId
    if (auto) {
      userId = findOrCreateClientIdAuto(cookieName, cookieExpires)
    } else {
      userId = findOrCreateClientId(cookieName, cookieDomain, cookieExpires)
    }
    if (id && userId) {
      this._baseUrl = `${baseUrl}/${id}/${userId}`
    }
  }

  _updateInteractCache (data: Object): void {
    if (cacheValidator(data) && this.active) {
      const types = getInteractTypes(data.type)
      types.forEach(type => {
        this._cache[type] = Object.assign({}, data, { type })
      })
    } else {
      warning(`failed ${data.type}`, data)
      this.active = false
    }
  }

  _sendInteracts (force: ?boolean): void {
    const query: string[] = obj2query(this.get('custom'))
    this._interacts.forEach(data => {
      const q = createInteractData(data)
      if (q.length) {
        query.push(`d=${q}`)
      }
    })

    if (this._baseUrl && (query.length >= MAX_INTERACT || force)) {
      get(`${this._baseUrl}/${this._loadTime}/int.gif`, query)
      this._interacts.length = 0
    }
  }

  _clear () {
    this._cache = {
      a: {},
      l: {}
    }
  }

  _sendInteractsWithUpdate (): void {
    Object.keys(this._cache).forEach(key => {
      if (cacheValidator(this._cache[key])) {
        this._interacts.push(
          Object.assign({}, this._cache[key], {
            id: this._interactId
          })
        )
      }
    })

    this._clear()
    this._sendInteracts()

    if (this.active) {
      const delay = this._interval.shift()
      if (delay >= 0) {
        setTimeout(this._sendInteractsWithUpdate.bind(this), delay * 1000)
      }
      this._interactId++
    }
  }

  send (type: SendType, page: string): void {
    switch (type) {
      case 'pageview':
        const env = getEnv(page)
        if (!env || !this._baseUrl) {
          return warning(`failed init`)
        }
        const state: State = this.merge({
          type: 'env',
          data: env
        })

        this._interval = INTERVAL_DEFAULT_SETTING.concat()
        this._interactId = 0
        const data = Object.assign({}, state.env, state.custom)
        this._loadTime = Date.now()
        get(`${this._baseUrl}/${this._loadTime}/env.gif`, obj2query(data))
        this.active = true
        this.listen()
    }
  }

  destroy (): void {
    this._sendInteracts(true)
    this._emitter.removeListener(this.id, this._updateInteractCache.bind(this))
    this._events.forEach(e => {
      e.off()
    })
    this.active = false
    this._loadTime = 0
  }

  listen (): void {
    if (!this.active || !this._loadTime) {
      return raise('need send pageview')
    }
    this._emitter.on(this.id, this._updateInteractCache.bind(this))
    this._events.forEach(e => {
      e.on()
    })
    this._sendInteractsWithUpdate()
  }
}
