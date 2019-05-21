import { EventEmitter } from 'events'

import { save as autoSave } from 'auto-cookie'
import { get as getCookie, set as setCookie } from 'js-cookie'
import * as objectAssign from 'object-assign'
import { UIEventObserver } from 'ui-event-observer'
import { EventFieldsObject } from 'userdive/lib/types'
import { v4 as uuid } from 'uuid'

import { getEnv, getLocation } from './browser'
import {
  INTERACTION as MAX_INTERACTION,
  INTERVAL as INTERVAL_DEFAULT_SETTING,
  MAX_EVENT_SEQ,
} from './constants'
import { AgentEvent } from './events'
import { raise, warning } from './logger'
import { get, obj2query } from './requests'
import Store from './store'
import {
  ClientEnvironmentsData,
  Interaction,
  SettingFieldsObject,
} from './types'

const generateId = () => uuid().replace(/-/g, '')

const cacheValidator = ({ x, y, type, left, top }: Interaction): boolean => {
  if (x > 0 && y > 0 && type && left >= 0 && top >= 0) {
    return true
  }
  return false
}

const toInt = (n: number) => Math.floor(n)
const createInteractionData = (d: Interaction): string =>
  cacheValidator(d)
    ? `${d.type},${d.id},${toInt(d.x)},${toInt(d.y)},${toInt(d.left)},${toInt(
        d.top
      )}`
    : ''

const findOrCreateClientId = (
  {
    allowLinker,
    cookieDomain,
    cookieExpires: expires,
    cookieName,
    cookiePath: path,
    linkerName,
  }: SettingFieldsObject,
  { search }: Location
): string => {
  let clientId = getCookie(cookieName)
  if (allowLinker) {
    const qs = search.trim().replace(/^[?#&]/, '')
    const [linkerParam] = qs
      .split('&')
      .filter(s => s.length && s.split('=')[0] === linkerName)
    const id = linkerParam ? linkerParam.split('=')[1] : undefined
    if (id && id.length === 32 && !id.match(/[^A-Za-z0-9]+/)) {
      clientId = id
    }
  }
  if (!clientId || allowLinker) {
    clientId = clientId || generateId()
    const writeCookie = cookieDomain === 'auto' ? autoSave : setCookie
    writeCookie(cookieName, clientId, {
      domain: cookieDomain === 'auto' ? undefined : cookieDomain,
      expires,
      path,
    })
  }
  return clientId
}

const pathname2href = (pathname: string) =>
  !/^http/.test(pathname)
    ? `${location.protocol}//${location.host}${pathname}`
    : pathname

export default class AgentCore extends Store {
  public observer: UIEventObserver
  private baseUrl: string
  private cache: { a: object; l: object; [key: string]: object }
  private emitter: EventEmitter
  private events: AgentEvent[]
  private interactionId: number
  private eventId: number
  private interactions: Interaction[]
  private interval: number[]
  private loadTime: number
  private id: string
  public constructor(
    id: string,
    eventsClass: any[], // TODO
    settings: SettingFieldsObject
  ) {
    const clientId = settings.clientId
      ? settings.clientId
      : findOrCreateClientId(settings, getLocation())
    super(clientId)

    this.id = generateId()
    this.clear()
    this.events = []
    this.interactions = []
    this.interval = []
    this.interactionId = 0
    this.eventId = 0
    this.emitter = new EventEmitter()
    this.observer = new UIEventObserver() // singleton
    eventsClass.forEach(Class => {
      this.events.push(new Class(this.id, this.emitter, this.observer))
    })
    if (!id || !clientId) {
      raise('need generated id')
      return
    }
    this.baseUrl = `${settings.baseUrl}/${id}/${clientId}`
    this.emitter.on(this.id, this.updateInteractionCache.bind(this))
  }

  public pageview(page: string): void {
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
    this.interactionId = 0
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

  public event({
    eventCategory: category,
    eventLabel: label,
    eventAction: action,
    eventValue: value,
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
          }`,
        ],
        true
      )
    }
  }

  public destroy(): void {
    this.emitter.removeAllListeners(this.id)
    this.events.forEach(e => e.off())
    this.loadTime = 0
  }

  public send(query: string[], force?: boolean): void {
    if (
      this.baseUrl &&
      (force || this.interactions.length >= MAX_INTERACTION)
    ) {
      const interactionsToSend = this.interactions.slice()
      this.interactions.length = 0

      interactionsToSend.forEach(data => {
        const q = createInteractionData(data)
        if (q.length) {
          query.push(`d=${q}`)
        }
      })
      if (query.length > 0) {
        // TODO v(version) initialized after send pageview. it should be initialize on constructor.
        const { v } = this.get('env') as ClientEnvironmentsData
        get(
          `${this.baseUrl}/${this.loadTime}/int.gif`,
          query.concat(
            obj2query(
              objectAssign({}, { v }, this.get('custom')) as any /* TODO */
            )
          ),
          () => {
            this.destroy()
          }
        )
      }
    }
  }

  public update(): void {
    Object.keys(this.cache).forEach(key => {
      const cache: any = this.cache[key] // TODO
      if (cacheValidator(cache)) {
        cache.id = this.interactionId
        this.interactions.push(cache)
      }
    })
  }

  private sendWithUpdate(): void {
    this.update()
    this.clear()
    this.send([])

    if (this.loadTime) {
      const delay = this.interval.shift()
      if (delay !== undefined && delay >= 0) {
        setTimeout(this.sendWithUpdate.bind(this), delay * 1000)
      }
      this.interactionId++
    }
  }

  private bind() {
    this.events.forEach(e => e.on())
  }

  private updateInteractionCache(data: Interaction): void {
    if (cacheValidator(data) && this.loadTime) {
      this.cache[data.type] = data
    }
  }

  private clear(): void {
    this.cache = {
      a: {},
      l: {},
    }
  }
}
