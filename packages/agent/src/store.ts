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

const parseCustomDataKey = (long: string, prefix: string): string => {
  const [, index] = long.split(prefix)
  return parseInt(index, 10) <= CUSTOM_INDEX ? `c${prefix[0]}${index}` : ''
}

const parseCustomData = (
  key: string, // TODO only enum string Metric | Dimension
  value: string | number
): any => {
  const data: any = {}
  let splitedKey = parseCustomDataKey(key, 'dimension')
  if (splitedKey && value) {
    data[splitedKey] = value
  }
  splitedKey = parseCustomDataKey(key, 'metric')
  if (splitedKey && typeof value === 'number') {
    data[splitedKey] = value
  }
  return data
}

const initialState = (): State => ({
  userId: '',
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
})

export default class Store {
  private state: State
  constructor (id: string) {
    this.reset()
    this.state.userId = id
  }
  public get (
    key: 'env' | 'custom' | 'userId'
  ): ClientEnvironmentsData | CustomData | string {
    const data = this.state[key]
    if (key === 'custom') {
      this.state[key] = {}
    }
    return data
  }
  public set (type: SetType, data: any): State {
    switch (type) {
      case 'page':
        this.state.env.l = data
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
  public merge ({ type, data }: ClientEnvironments | Custom): State {
    const stateObj = initialState()
    this.state[type] = objectAssign({}, stateObj[type], this.state[type], data)
    return this.state
  }
  public mergeDeep (obj: any): State {
    if (obj.page) {
      this.state.env.l = obj.page
    }
    let data = {}
    Object.keys(obj).forEach((key) => {
      data = objectAssign({}, data, parseCustomData(key, obj[key]))
    })
    return this.merge({ type: 'custom', data })
  }
  protected reset (): void {
    this.state = initialState()
  }
}
