import events from 'events'
import throttle from 'throttle-debounce'

import { NAME } from './events'
import Store from './store'
import { get } from './requests'
import { VERSION as v } from './constants'
import Logger from './logger'
import type {
  ClientEnvironmentsData,
  Options,
  State,
  SendType
} from './types'

type Size = {
  h: number,
  w: number
}

type Interact = {
  x: number,
  y: number,
  t: number,
  type: 'l' | 'a',
  left: number,
  top: number
}

const SIZE: Size = {
  h: 0,
  w: 0
}

export default class Agent extends Store {
  logger: Logger
  events: []
  interacts: Interact[]
  emitter: events.EventEmitter
  loaded: boolean
  constructor (id: string, eventsClass: any[], options: Options): void {
    super(id, options.baseUrl, options.cookieName)
    this.emitter = new events.EventEmitter()
    this.logger = new Logger(options.Raven)
    const eventInstances = []
    eventsClass.forEach(Class => {
      eventInstances.push(new Class(this.emitter, this.logger))
    })
    this.events = eventInstances
  }
  send (type: SendType): void {
    switch (type) {
      case 'pageview':
        const state: State = this.merge({
          type: 'env',
          data: ((windowSize, resourceSize, screenSize): ClientEnvironmentsData => {
            return {
              v,
              sh: screenSize.h,
              sw: screenSize.w,
              wh: windowSize.h,
              ww: windowSize.w,
              h: resourceSize.h,
              w: resourceSize.w
            }
          })(this.getWindowSize(window), this.getResourceSize(document), this.getScreenSize(screen))
        })
        get(`${this.baseUrl}/env.gif`, state.env, state.custom)
        this.listen()
        this.loaded = true
    }
  }
  _save (data: Interact): void {
    this.interacts.push(data)
  }
  destroy (): void {
    this.events.forEach(e => {
      e.unbind()
    })
    this.emitter.removeAllListeners()
  }
  listen (): void {
    if (!this.loaded) {
      return
    }
    this.emitter.on(NAME, data => {
      throttle(0, this._save)
    })
    this.events.forEach(e => {
      e.bind()
    })
  }
  getWindowSize (w: {innerHeight: number, innerWidth: number}): Size {
    return {
      h: w.innerHeight,
      w: w.innerWidth
    }
  }
  getResourceSize ({ body }: Document): Size {
    if (!body) {
      return SIZE
    }
    return {
      h: body.clientHeight,
      w: body.clientWidth
    }
  }
  getScreenSize (s: {height: number, width: number}): Size {
    return {
      h: s.height,
      w: s.width
    }
  }
}
