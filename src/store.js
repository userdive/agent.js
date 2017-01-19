/* @flow */
import cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import { VERSION as v } from './constants'
import type {
  Custom,
  CustomData,
  ClientEnvironments,
  State,
  Metric,
  SetType,
  Dimension
} from './types'

function findOrCreateClientId (name: string): string {
  const c = cookies.get(name)
  if (c) {
    return c
  }
  return uuid().replace(/-/g, '')
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

export default class Store {
  BASE_URL: string
  baseUrl: string
  COOKIE_NAME: string
  pid: string
  PROJECT_ID: string
  state: State
  constructor (projectId: string, baseUrl: string, cookieName: string): void {
    this.PROJECT_ID = projectId
    this.BASE_URL = baseUrl
    this.COOKIE_NAME = cookieName
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
  set (type: SetType, data: any): State {
    switch (type) {
      case 'page':
        const l: string = data
        this.state.env.l = l
        break
      default:
        this.state.custom = parseCustomData(type, data)
    }
    return this.state
  }
  mergeDeep (data: Object): State {
    if (data.page) {
      this.state.env.l = data.page
      delete data.page
    }
    let result = {}
    Object.keys(data).forEach(key => {
      result = Object.assign({}, result, parseCustomData((key: any), data[key]))
    })
    return this.merge({type: 'custom', data: result})
  }
  merge (obj: ClientEnvironments | Custom): State {
    switch (obj.type) {
      case 'env':
        const clientId = findOrCreateClientId(this.COOKIE_NAME)
        const loadTime = Date.now()
        this.baseUrl = `${this.BASE_URL}/${this.PROJECT_ID}/${clientId}/${loadTime}`
        this.state[obj.type] = Object.assign({}, this.state[obj.type], obj.data)
        break
      case 'custom':
        this.state[obj.type] = Object.assign({}, this.state[obj.type], obj.data)
        break
    }

    return this.state
  }
}
