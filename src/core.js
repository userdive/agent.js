/* @flow */
import Store from './store'
import { get } from './requests'
import { VERSION as v } from './constants'
import type {
  ClientEnvironments,
  CustomData,
  Options
} from './types'

type Size = {
  h: number,
  w: number
}

function getResourceSize (body): Size {
  return {
    h: body.clientHeight,
    w: body.clientWidth
  }
}

function getScreenSize (s): Size {
  return {
    h: s.height,
    w: s.width
  }
}

function getWindowSize (w): Size {
  return {
    h: w.innerHeight,
    w: w.innerWidth
  }
}

module.exports = class Agent {
  store: Store;
  loaded: boolean;
  constructor (id: string, options: Options): void {
    this.store = new Store(id, options.baseUrl, options.cookieName)
  }
  send (type: string): void {
    switch (type) {
      case 'pageview':
        const state = this.store.merge(
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
          })(getWindowSize(window), getResourceSize(document.body), getScreenSize(screen))
        )
        get(`${this.store.baseUrl}/env.gif`, state.env, state.custom)
        this.loaded = true
    }
  }

  set (key: string | {}, value?: string): void {
    if (arguments.length === 1) {
      this.store.merge(
        'custom',
        ((data): CustomData => {
          return {
          }
        })(key)
      )
    }

    // 'dimension5': 'custom dimension data',
    // 'metric5': 'custom metric data'
  }
  destory () {
    // TODO unbind
  }
}
