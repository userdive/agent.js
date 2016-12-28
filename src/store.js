/* @flow */
import cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import { VERSION as v } from './constants'
import type {
  CustomData,
  ClientEnvironments,
  State
} from './types'
type StoreType = 'env' | 'custom'

function findOrCreateClientId (name: string): string {
  const c = cookies.get(name)
  if (c) {
    return c
  }
  return uuid().replace(/-/g, '')
}

let PROJECT_ID, BASE_URL, COOKIE_NAME

export default class Store {
  pid: string;
  baseUrl: string;
  state: State;
  constructor (projectId: string, baseUrl: string, cookieName: string): void {
    if (!projectId || !baseUrl || !cookieName) {
      throw new Error('need id & baseurl & cookieName')
    }
    PROJECT_ID = projectId
    BASE_URL = baseUrl
    COOKIE_NAME = cookieName
    this.state = {
      env: {
        v,
        h: 0,
        w: 0,
        sh: 0,
        sw: 0,
        wh: 0,
        ww: 0
      },
      custom: {}
    }
  }
  merge (type: StoreType, data: ClientEnvironments | CustomData): State {
    let prefix
    switch (type) {
      case 'env':
        const clientId = findOrCreateClientId(COOKIE_NAME)
        const loadTime = Date.now()
        this.baseUrl = `${BASE_URL}/${PROJECT_ID}/${clientId}/${loadTime}`
        prefix = type
        break
      case 'custom':
        // TODO validate
        prefix = type
        break
    }
    if (prefix) {
      for (const key in data) {
        this.state[prefix][key] = data[key]
      }
    }

    return this.state
  }
}
