/* @flow */
import cookies from 'js-cookie'

import { timestamp } from './alias'
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

module.exports = class Store {
  baseUrl: string;
  state: State;
  constructor (projectId: string, baseUrl: string): void {
    // TODO valiadte
    if (!projectId || !baseUrl) {
      throw new Error('need id & baseurl')
    }

    const clientId = findOrCreateClientId()
    const loadTime = timestamp()
    this.baseUrl = `${baseUrl}/${projectId}/${clientId}/${loadTime}`
  }
  merge (type: string, data: Object): State {
    switch (type) {
      case 'env':
        return Object.assign(this.state || {}, {env: data})
    }
    return this.state
  }
}
