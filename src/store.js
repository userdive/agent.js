/* @flow */
import cookies from 'js-cookie'

import { v4 as uuid } from 'uuid'

import type { ClientEnvironments } from './types'

type State = {
  env: ClientEnvironments
}

function findOrCreateClientId (name: string): string {
  try {
    const c = cookies.get(name)
    if (c) {
      return c
    }
  } catch (err) {
    // TODO logger
    throw err
  }
  return uuid().replace(/-/g, '')
}

let PROJECT_ID, BASE_URL, COOKIE_NAME

module.exports = class Store {
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
  }
  merge (type: string, data: Object): State {
    switch (type) {
      case 'env':
        const clientId = findOrCreateClientId(COOKIE_NAME)
        const loadTime = Date.now()
        this.baseUrl = `${BASE_URL}/${PROJECT_ID}/${clientId}/${loadTime}`
        return Object.assign(this.state || {}, {env: data})
    }
    return this.state
  }
}
