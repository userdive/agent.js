/* @flow */
import Store from './store'
import { VERSION as v } from './constants'
import { get } from './requests'

type Size = {
  h: number,
  w: number
}

function resourceSize (body): Size {
  return {
    h: body.clientHeight,
    w: body.clientWidth
  }
}

function screenSize (s): Size {
  return {
    h: s.height,
    w: s.width
  }
}

function windowSize (w): Size {
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
        const state = this.store.merge('env', ((w, body, s) => {
          return {
            v,
            sh: screenSize(s).h,
            sw: screenSize(s).w,
            wh: windowSize(w).h,
            ww: windowSize(w).w,
            h: resourceSize(body).h,
            w: resourceSize(body).w
          }
        })(window, document.body, screen))
        get(`${this.store.baseUrl}/env.gif`, state.env)
    }
  }
}
