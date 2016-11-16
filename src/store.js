/* @flow */
import { uniqueId } from './utilities'
import { VERSION as v } from './constants'
import {
  clientHeight,
  clientWidth,
  innerHeight,
  innerWidth,
  screenHeight,
  screenWidth,
  timestamp
} from './alias'
import type { ClientEnvironments } from './types'

let baseUrl: string
let clientId: string
let projectId: string

let h: number
let w: number

let loadTime: number

let sh: number
let sw: number

let wh: number
let ww: number

// TODO Stop trackihng
const nullValidate = hash => {
  for (const d in hash) {
    if (!d) {
      throw new Error('Empty')
    }
  }
  return hash
}

const getBaseUrl = () => {
  // TODO validation
  return `${baseUrl}/${projectId}/${clientId}/${loadTime}/`
}

const setup = (id: string, url: string) => {
  projectId = id
  baseUrl = url
  clientId = uniqueId()  // TODO store cookie? storage
}

const size = () => {
  loadTime = timestamp()
  h = clientHeight()
  w = clientWidth()
  sh = screenHeight()
  sw = screenWidth()
  wh = innerHeight()
  ww = innerWidth()
}

const getEnv = (): ClientEnvironments => {
  // TODO validation
  const data = { v, sh, sw, wh, ww, h, w }
  return nullValidate(data)
}

module.exports = {
  setup,
  size,
  getBaseUrl,
  getEnv
}
