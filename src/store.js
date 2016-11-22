/* @flow */
import cookies from 'js-cookie'

import { v4 as uuid } from 'uuid'
import { COOKIE } from './constants'

import type { ClientEnvironments } from './types'

type State = {
  env: ClientEnvironments
}

function findOrCreateClientId (): string {
  try {
    const c = cookies.get(COOKIE)
    if (c) {
      return c
    }
  } catch (err) {
    // TODO logger
    throw err
  }
  return uuid().replace(/-/g, '')
}

let PROJECT_ID, BASE_URL

module.exports = class Store {
  pid: string;
  baseUrl: string;
  state: State;
  constructor (projectId: string, baseUrl: string): void {
    if (!projectId || !baseUrl) {
      throw new Error('need id & baseurl')
    }
    PROJECT_ID = projectId
    BASE_URL = baseUrl
  }
  merge (type: string, data: Object): State {
    switch (type) {
      case 'env':
        const clientId = findOrCreateClientId()
        const loadTime = Date.now()
        this.baseUrl = `${BASE_URL}/${PROJECT_ID}/${clientId}/${loadTime}`
        return Object.assign(this.state || {}, {env: data})
    }
    return this.state
  }
}
