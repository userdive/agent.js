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
  SetType,
  State
} from './types'

type Size = {
  h: number,
  w: number
}

function parseCustomData (key: Metric | Dimension, value: string | number): CustomData {
  // TODO validate index, value.type
  const data = {}
  let splitedKey = key.split('dimension')
  if (splitedKey.length > 1) {
    data[`cd${splitedKey[1]}`] = value
  }
  splitedKey = key.split('metric')
  if (splitedKey.length > 1) {
    data[`cm${splitedKey[1]}`] = value
  }
  return data
}

export default class Agent {
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
          })(this.getWindowSize(window), this.getResourceSize(document.body), this.getScreenSize(screen))
        )
        get(`${this.store.baseUrl}/env.gif`, state.env, state.custom)
        this.loaded = true
    }
  }
  set (type: SetType, data: string | number): State {
    switch (type) {
      case 'page':
        return this.store.merge('env', {l: data})
      default:
        return this.store.merge('custom', parseCustomData(type, data))
    }
  }
  setObject (data: Object): State {
    if (data.page) {
      this.store.merge('env', {l: data.page})
      delete data.page
    }
    let result = {}
    Object.keys(data).forEach(key => {
      result = Object.assign(result, parseCustomData((key: any), data[key]))
    })
    return this.store.merge('custom', result)
  }
  destory () {
    // TODO unbind
  }
  getWindowSize (w: {innerHeight: number, innerWidth: number}): Size {
    return {
      h: w.innerHeight,
      w: w.innerWidth
    }
  }
  getResourceSize (body: HTMLElement): Size {
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
