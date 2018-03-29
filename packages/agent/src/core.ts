import { save as autoSave } from 'auto-cookie'
import { EventEmitter } from 'events'
import { get as getCookie, set as setCookie } from 'js-cookie'
import * as objectAssign from 'object-assign'
import { UIEventObserver } from 'ui-event-observer'
import { EventFieldsObject } from 'userdive/lib/types'
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
import { Interact, SettingFieldsObject } from './types'

const generateId = () => uuid().replace(/-/g, '')

const cacheValidator = ({ x, y, type, left, top }: Interact): boolean => {
  if (x > 0 && y > 0 && type && left >= 0 && top >= 0) {
    return true
  }
  return false
}

const toInt = (n: number) => Math.floor(n)
const createInteractData = (d: Interact): string =>
  cacheValidator(d)
    ? `${d.type},${d.id},${toInt(d.x)},${toInt(d.y)},${toInt(d.left)},${toInt(
      d.top
    )}`
    : ''

const findOrCreateUserId = ({
  allowLinker,
  cookieDomain,
  cookieExpires: expires,
  cookieName,
  cookiePath: path,
  linkerName
}: SettingFieldsObject): string => {
  let userId = getCookie(cookieName)
  if (allowLinker) {
    const qs = location.search.trim().replace(/^[?#&]/, '')
    const [linkerParam] = qs
      .split('&')
      .filter(s => s.length && s.split('=')[0] === linkerName)
    const id = linkerParam ? linkerParam.split('=')[1] : undefined
    if (id && id.length === 32 && !id.match(/[^A-Za-z0-9]+/)) {
      userId = id
    }
  }
  if (!userId || allowLinker) {
    userId = userId || generateId()
    ;(cookieDomain === 'auto' ? autoSave : setCookie)(cookieName, userId, {
      domain: cookieDomain === 'auto' ? undefined : cookieDomain,
      expires,
      path
    })
  }
  return userId
}

const pathname2href = (pathname: string) =>
  !/^http/.test(pathname)
    ? `${location.protocol}//${location.host}${pathname}`
    : pathname

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
    settings: SettingFieldsObject
  ) {
    const userId = findOrCreateUserId(settings)
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
    this.baseUrl = `${settings.baseUrl}/${id}/${userId}`
    this.emitter.on(this.id, this.updateInteractCache.bind(this))
  }

  pageview (page: string): void {
    this.send([], true)
    if (!this.loadTime) {
      this.bind()
    }

    const data = getEnv(pathname2href(page))
    if (!data || !this.baseUrl) {
      return warning(`failed init`)
    }
    this.merge({ type: 'env', data })

    this.interval = INTERVAL_DEFAULT_SETTING.concat()
    this.interactId = 0
    this.eventId = 0
    this.loadTime = Date.now()
    this.sendWithUpdate()
    get(
      `${this.baseUrl}/${this.loadTime}/env.gif`,
      obj2query(
        objectAssign({}, this.get('env'), this.get('custom')) as any /* TODO */
      ),
      () => {
        this.destroy()
      }
    )
    this.set('page', undefined) // remove locale cache
  }

  event ({
    eventCategory: category,
    eventLabel: label,
    eventAction: action,
    eventValue: value
  }: EventFieldsObject): void {
    this.eventId++
    const isNumber = (n?: number): boolean => typeof n === 'number' && n >= 0
    if (
      this.eventId <= MAX_EVENT_SEQ &&
      category &&
      action &&
      (!value || isNumber(value))
    ) {
      this.send(
        [
          `e=${this.eventId},${category},${action},${label || ''}${
            isNumber(value) ? ',' + value : ''
          }`
        ],
        true
      )
    }
  }

  destroy (): void {
    this.emitter.removeAllListeners(this.id)
    this.events.forEach(e => e.off())
    this.loadTime = 0
  }

  send (query: string[], force?: boolean): void {
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
      get(
        `${this.baseUrl}/${this.loadTime}/int.gif`,
        query.concat(obj2query(this.get('custom') as any /* TODO */)),
        () => {
          this.destroy()
        }
      )
      this.interacts.length = 0
    }
  }

  private sendWithUpdate (): void {
    Object.keys(this.cache).forEach(key => {
      const cache: any = this.cache[key] // TODO
      if (cacheValidator(cache)) {
        cache.id = this.interactId
        this.interacts.push(cache)
      }
    })

    this.clear()
    this.send([])

    if (this.loadTime) {
      const delay = this.interval.shift()
      if (delay !== undefined && delay >= 0) {
        setTimeout(this.sendWithUpdate.bind(this), delay * 1000)
      }
      this.interactId++
    }
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
