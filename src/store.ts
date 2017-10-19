import { CUSTOM_INDEX, VERSION as v } from './constants'
import {
  ClientEnvironments,
  Custom,
  CustomData,
  SetType,
  State
} from './types'

function parseCustomData (
  key: string, // TODO only enum string Metric | Dimension
  value: string | number
): CustomData {
  const data = {}
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
  _state: State
  constructor () {
    this.reset()
  }
  reset (): void {
    this._state = initialState()
  }
  get (key: 'env' | 'custom'): Object {
    return this._state[key]
  }
  set (type: SetType, data: any): State {
    switch (type) {
      case 'page':
        const l: string = data
        this._state.env.l = l
        break
      default:
        this._state.custom = Object.assign(
          {},
          this._state.custom,
          parseCustomData(type, data)
        )
    }
    return this._state
  }

  merge (obj: ClientEnvironments | Custom): State {
    const stateObj = initialState()
    this._state[obj.type] = Object.assign(
      stateObj[obj.type],
      this._state[obj.type],
      obj.data
    )
    return this._state
  }
  mergeDeep (obj: any): State {
    if (obj.page) {
      this._state.env.l = obj.page
      delete obj.page
    }
    let data = {}
    Object.keys(obj).forEach(key => {
      data = Object.assign({}, data, parseCustomData(key, obj[key]))
    })
    return this.merge({ type: 'custom', data })
  }
}
