/* @flow */
import { VERSION as v } from './constants'
import type {
  ClientEnvironments,
  Custom,
  CustomData,
  Dimension,
  Metric,
  SetType,
  State
} from './types'

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
  state: State
  constructor (): void {
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
        this.state.custom = Object.assign({}, this.state.custom, parseCustomData(type, data))
    }
    return this.state
  }
  merge (obj: ClientEnvironments | Custom): State {
    this.state[obj.type] = Object.assign({}, this.state[obj.type], obj.data)
    return this.state
  }
  mergeDeep (obj: Object): State {
    if (obj.page) {
      this.state.env.l = obj.page
      delete obj.page
    }
    let data = {}
    Object.keys(obj).forEach(key => {
      data = Object.assign({}, data, parseCustomData((key: any), data[key]))
    })
    return this.merge({type: 'custom', data})
  }
}
