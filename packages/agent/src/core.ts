import { save } from 'auto-cookie'
import { EventEmitter } from 'events'
import { get as getCookie, set as setCookie } from 'js-cookie'
import * as objectAssign from 'object-assign'
import { UIEventObserver } from 'ui-event-observer'
import { v4 as uuid } from 'uuid'

import { getEnv } from './browser'
import {
  INTERACT as MAX_INTERACT,
  INTERVAL as INTERVAL_DEFAULT_SETTING,
  MAX_EVENT_SEQ
} from './constants'
import { AgentEvent } from './events'
import { raise, warning } from './logger'
import { get, obj2query } from './requests'
import Store from './store'

import { Interact, SendData, SendEvent, SendType, Settings } from './types'

function generateId () {
  return uuid().replace(/-/g, '')
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

function pathname2href (pathname: string) {
  if (!/^http/.test(pathname)) {
    pathname = `${location.protocol}//${location.host}${pathname}`
  }
  return pathname
}

export default class AgentCore extends Store {
  observer: UIEventObserver
  private baseUrl: string
  private cache: { a: Object; l: Object; [key: string]: Object }
  private emitter: EventEmitter
  private events: AgentEvent[]
  private interactId: number
  private eventId: number
  private interacts: Interact[]
  private interval: number[]
  private loadTime: number
  private id: string
  constructor (
    id: string,
    eventsClass: any[], // TODO
    {
      allowLink,
      auto,
      baseUrl,
      cookieDomain: domain,
      cookieExpires: expires,
      cookieName,
      linkerName
    }: Settings
  ) {
    let userId = getCookie(cookieName)
    if (allowLink) {
      const qs = location.search.trim().replace(/^[?#&]/, '')
      const [linkerParam] = qs
        .split('&')
        .filter(s => s.length && s.split('=')[0] === linkerName)
      const id = linkerParam ? linkerParam.split('=')[1] : undefined
      if (id && id.length === 32 && !id.match(/[^A-Za-z0-9]+/)) {
        userId = id
      }
    }
    const saveCookie = auto ? save : setCookie
    if (!userId || allowLink) {
      userId = userId || generateId()
      saveCookie(cookieName, userId, {
        domain,
        expires
      })
    }
    super(userId)

    this.id = generateId()
    this.clear()
    this.events = []
    this.interacts = []
    this.interval = []
    this.interactId = 0
    this.eventId = 0
    this.emitter = new EventEmitter()
    this.observer = new UIEventObserver() // singleton
    eventsClass.forEach(Class => {
      this.events.push(new Class(this.id, this.emitter, this.observer))
    })
    if (!id || !userId) {
      raise('need generated id')
      return
    }
    this.baseUrl = `${baseUrl}/${id}/${userId}`
    this.emitter.on(this.id, this.updateInteractCache.bind(this))
  }

  send (type: SendType, sendData: SendData): void {
    switch (type) {
      case 'pageview':
        this.sendInteracts(true)
        if (!this.loadTime) {
          this.bind()
        }

        const data = getEnv(pathname2href(sendData as string))
        if (!data || !this.baseUrl) {
          return warning(`failed init`)
        }
        this.merge({ type: 'env', data })

        this.interval = INTERVAL_DEFAULT_SETTING.concat()
        this.interactId = 0
        this.eventId = 0
        this.loadTime = Date.now()
        this.sendInteractsWithUpdate()
        get(
          `${this.baseUrl}/${this.loadTime}/env.gif`,
          obj2query(objectAssign(
            {},
            this.get('env'),
            this.get('custom')
          ) as any),
          () => {
            this.destroy()
          }
        )
        break
      case 'event':
        const event = sendData as SendEvent
        if (
          event.category &&
          event.action &&
          (!event.value || event.value >= 0)
        ) {
          this.eventId++
          this.sendEvent(event)
        }
        break
    }
  }

  destroy (): void {
    this.emitter.removeAllListeners(this.id)
    this.events.forEach(e => e.off())
    this.loadTime = 0
  }

  sendInteracts (force?: boolean, optionalQuery?: string[]): void {
    const query: string[] = optionalQuery || []
    this.interacts.forEach(data => {
      const q = createInteractData(data)
      if (q.length) {
        query.push(`d=${q}`)
      }
    })

    if (
      this.baseUrl &&
      (query.length >= MAX_INTERACT || (force && query.length > 0))
    ) {
      const customState: any = this.get('custom')
      get(
        `${this.baseUrl}/${this.loadTime}/int.gif`,
        query.concat(obj2query(customState)),
        () => {
          this.destroy()
        }
      )
      this.interacts.length = 0
    }
  }

  protected sendEvent (e: SendEvent) {
    if (this.eventId <= MAX_EVENT_SEQ) {
      this.cacheToInteracts()
      const { category, action, label, value } = e
      let query = `e=${this.eventId},${category},${action}`
      query = label || value ? `${query},${label || ''}` : query
      query = value ? `${query},${value}` : query
      this.sendInteracts(true, [query])
      this.interactId++
    }
  }

  protected sendInteractsWithUpdate (): void {
    this.cacheToInteracts()
    this.sendInteracts()

    if (this.loadTime) {
      const delay = this.interval.shift()
      if (delay !== undefined && delay >= 0) {
        setTimeout(this.sendInteractsWithUpdate.bind(this), delay * 1000)
      }
      this.interactId++
    }
  }

  private cacheToInteracts () {
    Object.keys(this.cache).forEach(key => {
      const cache: any = this.cache[key]
      if (cacheValidator(cache)) {
        this.interacts.push(
          objectAssign({}, cache, {
            id: this.interactId
          })
        )
      }
    })
    this.clear()
  }

  private bind () {
    this.events.forEach(e => e.on())
  }

  private updateInteractCache (data: Interact): void {
    if (cacheValidator(data) && this.loadTime) {
      this.cache[data.type] = data
    }
  }

  private clear (): void {
    this.cache = {
      a: {},
      l: {}
    }
  }
}
