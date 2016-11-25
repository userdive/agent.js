/* @flow */
import Store from './store'
import { get } from './requests'
import { VERSION as v } from './constants'
import type {
  ClientEnvironments,
  CustomData,
  Dimension,
  Metric,
  Options,
  SendType,
  SetType
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

function parseCustomData (key: Metric | Dimension, value: string | number): CustomData {
  const data = {}
  let splitedKey = key.split('dimention')
  if (splitedKey.length > 1) {
    data[`cd${splitedKey[1]}`] = value
  }
  splitedKey = key.split('metric')
  if (splitedKey.length > 1) {
    data[`cm${splitedKey[1]}`] = value
  }
  return data
}

module.exports = class Agent {
  store: Store;
  loaded: boolean;
  constructor (id: string, options: Options): void {
    this.store = new Store(id, options.baseUrl, options.cookieName)
  }
  send (type: SendType): void {
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
  set (type: SetType, value: string | number): void {
    switch (type) {
      case 'page':
        this.store.merge('env', {l: value})
        break
      default:
        this.store.merge('custom', parseCustomData(type, value))
    }
  }
  setObject (data: Object): void {

  }
  destory () {
    // TODO unbind
  }
}
