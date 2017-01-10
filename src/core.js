/* @flow */
import throttle from 'lodash.throttle'

import Store from './store'
import { get } from './requests'
import { POINT, VERSION as v } from './constants'
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

const SIZE: Size = {
  h: 0,
  w: 0
}

export default class Agent extends Store {
  logger: Logger
  loaded: boolean
  constructor (id: string, options: Options): void {
    super(id, options.baseUrl, options.cookieName)
    this.logger = new Logger(options.Raven)
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
  destroy () {
    this.state.events.forEach(e => {
      e.unbind()
    })
  }
  listen () {
    if (this.loaded) {
      return
    }
    this.emitter.on(POINT, data => {
      throttle(() => {
      }, 2000) // FIXME
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
