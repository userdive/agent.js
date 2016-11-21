/* @flow */
import Store from './store'
import { VERSION as v } from './constants'
import {
  screenHeight,
  screenWidth,
  windowHeight,
  windowWidth,
  resourceHeight,
  resourceWidth
} from './alias'
import { get } from './requests'

module.exports = class Agent {
  store: Store;
  constructor (id: string, baseUrl: string): void {
    this.store = new Store(id, baseUrl)
  }
  send (type: string, pathname: string) {
    switch (type) {
      case 'pageview':
        const state = this.store.merge('env', {
          v,
          sh: screenHeight(),
          sw: screenWidth(),
          wh: windowHeight(),
          ww: windowWidth(),
          h: resourceHeight(),
          w: resourceWidth()
        })
        console.log(state)
        get(`${this.store.baseUrl}/env.gif`, {})
    }
  }
}
