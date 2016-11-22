/* @flow */
import Store from './store'
import { VERSION as v } from './constants'
import { get } from './requests'

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
  constructor (id: string, baseUrl: string): void {
    this.store = new Store(id, baseUrl, '_ud') // TODO FIX
  }
  send (type: string, pathname?: string) {
    switch (type) {
      case 'pageview':
        const state = this.store.merge('env', ((windowSize, resourceSize, screenSize) => {
          return {
            v,
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
}
