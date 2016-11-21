/* @flow */
import Store from './store'
import { VERSION as v } from './constants'
import {
  screenHeight,
  screenWidth,
  windowHeight,
  windowWidth,
  resourceHeight,
  resourceWidth,
  timestamp
} from './alias'
import { env as sendEnv } from './requests'

module.exports = class Agent {
  store: Store;
  constructor (id: string, baseUrl: string): void {
    this.store = new Store(id, baseUrl)
  }
  send (type: string, pathname: string) {
    switch (type) {
      case 'pageview':
        this.store.merge('env', {
          v,
          t: timestamp(),
          sh: screenHeight(),
          sw: screenWidth(),
          wh: windowHeight(),
          ww: windowWidth(),
          h: resourceHeight(),
          w: resourceWidth()
        })
        sendEnv()
    }
  }
}
