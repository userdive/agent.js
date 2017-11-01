import * as objectAssign from 'object-assign'

import { CUSTOM_INDEX, VERSION as v } from './constants'
import {
  ClientEnvironments,
  ClientEnvironmentsData,
  Custom,
  CustomData,
  SetType,
  State
} from './types'

function parseCustomData (
  key: string, // TODO only enum string Metric | Dimension
  value: string | number
): CustomData {
  const data: any = {}
  let splitedKey: any = key.split('dimension')
  if (splitedKey.length > 1 && parseInt(splitedKey[1], 10) <= CUSTOM_INDEX) {
    data[`cd${splitedKey[1]}`] = value
  }
  splitedKey = key.split('metric')
  if (
    splitedKey.length > 1 &&
    typeof value === 'number' &&
    parseInt(splitedKey[1], 10) <= CUSTOM_INDEX
  ) {
    data[`cm${splitedKey[1]}`] = value
  }
  return data
}

function initialState (): State {
  return {
    env: {
      v,
      l: '',
      r: '',
      n: '',
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

export default class Store {
  private state: State
  constructor () {
    this.reset()
  }
  public reset (): void {
    this.state = initialState()
  }
  public get (key: 'env' | 'custom'): ClientEnvironmentsData | CustomData {
    return this.state[key]
  }
  public set (type: SetType, data: any): State {
    switch (type) {
      case 'page':
        const l: string = data
        this.state.env.l = l
        break
      default:
        this.state.custom = objectAssign(
          {},
          this.state.custom,
          parseCustomData(type, data)
        )
    }
    return this.state
  }
  public merge (obj: ClientEnvironments | Custom): State {
    const stateObj = initialState()
    this.state[obj.type] = objectAssign(
      stateObj[obj.type],
      this.state[obj.type],
      obj.data
    )
    return this.state
  }
  public mergeDeep (obj: any): State {
    if (obj.page) {
      this.state.env.l = obj.page
      delete obj.page
    }
    let data = {}
    Object.keys(obj).forEach(key => {
      data = objectAssign({}, data, parseCustomData(key, obj[key]))
    })
    return this.merge({ type: 'custom', data })
  }
}
