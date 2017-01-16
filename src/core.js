/* @flow */
import events from 'events'
import throttle from 'throttle-debounce'

import { NAME } from './events'
import Store from './store'
import { get } from './requests'
import { VERSION as v } from './constants'
import Logger from './logger'
import type {
  ClientEnvironments,
  Options,
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
    this.events = []
    eventsClass.forEach(Class => {
      this.events.push(new Class(this.emitter, this.logger))
    })
  }
  send (type: SendType): void {
    switch (type) {
      case 'pageview':
        const state = this.merge(
          'env',
          ((windowSize, resourceSize, screenSize): ClientEnvironments => {
            return {
              v,
              sh: screenSize.h,
              sw: screenSize.w,
              wh: windowSize.h,
              ww: windowSize.w,
              h: resourceSize.h,
              w: resourceSize.w
            }
          })(this.getWindowSize(window), this.getResourceSize(document.body), this.getScreenSize(screen))
        )
        get(`${this.baseUrl}/env.gif`, state.env, state.custom)
        this.listen()
        this.loaded = true
    }
  }
  _save (data: Interact) {
    this.interacts.push(data)
  }
  destroy () {
    this.events.forEach(e => {
      e.unbind()
    })
    this.emitter.removeAllListeners()
  }
  listen () {
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
    let data = SIZE
    try {
      data = {
        h: w.innerHeight,
        w: w.innerWidth
      }
    } catch (err) {
      this.logger.error(err)
    }
    return data
  }
  getResourceSize (body: HTMLElement): Size {
    let data = SIZE
    try {
      data = {
        h: body.clientHeight,
        w: body.clientWidth
      }
    } catch (err) {
      this.logger.error(err)
    }
    return data
  }
  getScreenSize (s: {height: number, width: number}): Size {
    let data = SIZE
    try {
      data = {
        h: s.height,
        w: s.width
      }
    } catch (err) {
      this.logger.error(err)
    }
    return data
  }
}
