import { EventEmitter } from 'events'
import { UIEventObserver } from 'ui-event-observer'
import { find, save } from 'auto-cookie'
import * as cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import { get, obj2query } from './requests'
import { getEnv } from './browser'
import { setup, raise, warning } from './logger'
import {
  INTERVAL as INTERVAL_DEFAULT_SETTING,
  INTERACT as MAX_INTERACT
} from './constants'
import Store from './store'

import { Interact, SendType, Settings, State } from './types'

function generateId () {
  return uuid().replace(/-/g, '')
}

function findOrCreateClientId (
  cookieName: string,
  cookieDomain: string,
  cookieExpires?: number
): string | undefined {
  const options = { domain: cookieDomain, expires: cookieExpires }
  const c = cookies.get(cookieName)
  if (c) {
    return c
  }
  cookies.set(cookieName, generateId(), options)
  return cookies.get(cookieName)
}

function findOrCreateClientIdAuto (cookieName: string, cookieExpires): string {
  const c = find(cookieName, cookieExpires)
  if (c) {
    return c
  }
  return save(cookieName, generateId(), cookieExpires)
}

function cacheValidator ({ x, y, type, left, top }: Interact): boolean {
  if (x > 0 && y > 0 && type && left >= 0 && top >= 0) {
    return true
  }
  return false
}

function toInt (n: number) {
  return Math.floor(n)
}

function createInteractData (d: Interact): string {
  if (!cacheValidator(d)) {
    return ''
  }
  return `${d.type},${d.id},${toInt(d.x)},${toInt(d.y)},${toInt(
    d.left
  )},${toInt(d.top)}`
}

export default class AgentCore extends Store {
  _baseUrl: string
  _cache: { a: Object; l: Object }
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
  ) {
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

  _updateInteractCache (data: any): void {
    if (cacheValidator(data) && this.active) {
      this._cache[data.type] = data
    }
  }

  _sendInteracts (force?: boolean): void {
    const query: string[] = []
    this._interacts.forEach(data => {
      const q = createInteractData(data)
      if (q.length) {
        query.push(`d=${q}`)
      }
    })

    if (this._baseUrl && (query.length >= MAX_INTERACT || force)) {
      get(
        `${this._baseUrl}/${this._loadTime}/int.gif`,
        query.concat(obj2query(this.get('custom'))),
        () => {
          //
        },
        () => {
          this.active = false
        }
      )
      this._interacts.length = 0
    }
  }

  _clear (): void {
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
      if (delay !== undefined && delay >= 0) {
        setTimeout(this._sendInteractsWithUpdate.bind(this), delay * 1000)
      }
      this._interactId++
    }
  }

  send (type: SendType, page: string): void {
    switch (type) {
      case 'pageview':
        this.destroy(false)

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
        get(
          `${this._baseUrl}/${this._loadTime}/env.gif`,
          obj2query(data),
          () => {
            this.active = true
            this.listen()
          },
          () => {
            this.active = false
          }
        )
    }
  }

  destroy (isPageHide: boolean): void {
    this._sendInteracts(isPageHide)
    this._emitter.removeAllListeners(this.id)
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
