/* @flow */
import { uniqueId } from './utilities'
import { VERSION as v } from './constants'
import {
  clientHeight,
  clientWidth,
  innerHeight,
  innerWidth,
  screenHeight,
  screenWidth
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

const getBaseUrl = () => {
  return `${baseUrl}/${projectId}/${clientId}/${loadTime}/`
}

const setup = (id: string, url: string) => {
  projectId = id
  baseUrl = url
  clientId = uniqueId()  // TODO store cookie? storage
}

const size = () => {
  h = clientHeight()
  w = clientWidth()
  sh = screenHeight()
  sw = screenWidth()
  wh = innerHeight()
  ww = innerWidth()
}

const getEnv = (): ClientEnvironments => {
  // TODO validation
  return { v, sh, sw, wh, ww, h, w }
}

module.exports = {
  setup,
  size,
  getBaseUrl,
  getEnv
}
