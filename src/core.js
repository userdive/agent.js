/* @flow */
import Store from './store'
import { get } from './requests'
import type { Options } from './types'

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
  constructor (id: string, baseUrl: string, options: Options): void {
    this.store = new Store(id, baseUrl, options.cookieName || '_ud') // TODO FIX
  }
  send (type: string, pathname?: string): void {
    switch (type) {
      case 'pageview':
        const state = this.store.merge('env', ((windowSize, resourceSize, screenSize) => {
          return {
            sh: screenSize.h,
            sw: screenSize.w,
            wh: windowSize.h,
            ww: windowSize.w,
            h: resourceSize.h,
            w: resourceSize.w
          }
        })(getWindowSize(window), getResourceSize(document.body), getScreenSize(screen)))
        get(`${this.store.baseUrl}/env.gif`, state.env)
    }
  }
  set (key: string | {}, value?: string) {

    // 'dimension5': 'custom dimension data',
    // 'metric5': 'custom metric data'

  }
}
