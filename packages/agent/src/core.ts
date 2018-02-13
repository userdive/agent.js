import { find, save } from 'auto-cookie'
import { EventEmitter } from 'events'
import * as cookies from 'js-cookie'
import * as objectAssign from 'object-assign'
import { parse } from 'query-string'
import { UIEventObserver } from 'ui-event-observer'
import { v4 as uuid } from 'uuid'

import { getEnv } from './browser'
import {
  INTERACT as MAX_INTERACT,
  INTERVAL as INTERVAL_DEFAULT_SETTING
} from './constants'
import { raise, setup, warning } from './logger'
import { get, obj2query } from './requests'
import Store from './store'

import { Interact, SendType, Settings } from './types'

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

function findOrCreateClientIdAuto (
  cookieName: string,
  cookieExpires: number,
  value?: string
): string | undefined {
  const cookieAttr: cookies.CookieAttributes = {
    expires: cookieExpires
  }
  const c = find(cookieName)
  if (c) {
    return c
  }
  const v = value || generateId()
  return save(cookieName, v, cookieAttr)
}

function findClientIdFromQueryString (): string | undefined {
  const id: any = parse(location.search)['_ud']
  return id && id.length === 32 && !id.match(/[^A-Za-z0-9]+/) ? id : undefined
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

function cookieClientId (
  auto: boolean,
  cookieName: string,
  cookieDomain: string,
  cookieExpires: number
) {
  let userId
  if (!userId) {
    if (auto) {
      userId = findOrCreateClientIdAuto(cookieName, cookieExpires)
    } else {
      userId = findOrCreateClientId(cookieName, cookieDomain, cookieExpires)
    }
  }
  return userId
}

function queryStringClientId (
  cookieName: string,
  cookieExpires: number
): string | undefined {
  const userId = findClientIdFromQueryString()
  if (userId) {
    findOrCreateClientIdAuto(cookieName, cookieExpires, userId)
  }
  return userId
}

export default class AgentCore extends Store {
  private baseUrl: string
  private linkParam: { [key: string]: string }
  private cache: { a: Object; l: Object; [key: string]: Object }
  private emitter: EventEmitter
  private events: any[]
  private interactId: number
  private interacts: Interact[]
  private interval: number[]
  private loadTime: number
  private active: boolean
  private id: string
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
      auto,
      allowLink
    }: Settings
  ) {
    super()
    setup(RAVEN_DSN, Raven)

    this.id = generateId()
    this.clear()
    this.events = []
    this.interacts = []
    this.interval = []
    this.interactId = 0
    this.emitter = new EventEmitter()

    const observer = new UIEventObserver() // singleton
    eventsClass.forEach(Class => {
      this.events.push(new Class(this.id, this.emitter, observer))
    })

    let userId: any = allowLink
      ? queryStringClientId(cookieName, cookieExpires)
      : undefined
    if (!userId) {
      userId = cookieClientId(auto, cookieName, cookieDomain, cookieExpires)
    }
    if (id && userId) {
      this.linkParam = { _ud: userId }
      this.baseUrl = `${baseUrl}/${id}/${userId}`
    }
  }

  send (type: SendType, page: string): void {
    switch (type) {
      case 'pageview':
        this.destroy(false)

        const data = getEnv(pathname2href(page))
        if (!data || !this.baseUrl) {
          return warning(`failed init`)
        }
        this.merge({ type: 'env', data })

        this.interval = INTERVAL_DEFAULT_SETTING.concat()
        this.interactId = 0
        this.loadTime = Date.now()
        get(
          `${this.baseUrl}/${this.loadTime}/env.gif`,
          obj2query(objectAssign(
            {},
            this.get('env'),
            this.get('custom')
          ) as any),
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
    this.sendInteracts(isPageHide)
    this.emitter.removeAllListeners(this.id)
    this.events.forEach(e => e.off())
    this.active = false
    this.loadTime = 0
  }

  listen (): void {
    if (!this.active || !this.loadTime) {
      return raise('need send pageview')
    }
    this.emitter.on(this.id, this.updateInteractCache.bind(this))
    this.events.forEach(e => e.on())
    this.sendInteractsWithUpdate()
  }

  getLinkParam (): { [key: string]: string } {
    return this.linkParam
  }

  protected sendInteractsWithUpdate (): void {
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
    this.sendInteracts()

    if (this.active) {
      const delay = this.interval.shift()
      if (delay !== undefined && delay >= 0) {
        setTimeout(this.sendInteractsWithUpdate.bind(this), delay * 1000)
      }
      this.interactId++
    }
  }

  private updateInteractCache (data: Interact): void {
    if (cacheValidator(data) && this.active) {
      this.cache[data.type] = data
    }
  }

  private sendInteracts (force?: boolean): void {
    const query: string[] = []
    this.interacts.forEach(data => {
      const q = createInteractData(data)
      if (q.length) {
        query.push(`d=${q}`)
      }
    })

    if (this.baseUrl && (query.length >= MAX_INTERACT || force)) {
      const customState: any = this.get('custom')
      get(
        `${this.baseUrl}/${this.loadTime}/int.gif`,
        query.concat(obj2query(customState)),
        () => {
          //
        },
        () => {
          this.active = false
        }
      )
      this.interacts.length = 0
    }
  }

  private clear (): void {
    this.cache = {
      a: {},
      l: {}
    }
  }
}
