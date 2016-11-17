/* @flow */
import { uniqueId } from './utilities'
import { VERSION as v } from './constants'
import {
  sh, sw, wh, ww, h, w,
  timestamp
} from './alias'
import type { ClientEnvironments } from './types'

let baseUrl: string
let clientId: string
let projectId: string

let clientHeight: number
let clientWidth: number

let loadTime: number

let screenHeight: number
let screenWidth: number

let innerHeight: number
let innerWidth: number

const getBaseUrl = () => {
  // TODO validation
  return `${baseUrl}/${projectId}/${clientId}/${loadTime}/`
}

const setup = (id: string, url: string) => {
  projectId = id
  baseUrl = url
  clientId = uniqueId()  // TODO store cookie? storage
}

const initialView = () => {
  loadTime = timestamp()
  clientHeight = h()
  clientWidth = w()
  screenHeight = sh()
  screenWidth = sw()
  innerHeight = wh()
  innerWidth = ww()
}

const getEnv = (): ClientEnvironments => {
  // TODO validation
  return {
    v,
    sh: screenHeight,
    sw: screenWidth,
    wh: innerHeight,
    ww: innerWidth,
    h: clientHeight,
    w: clientWidth
  }
}

module.exports = {
  setup,
  initialView,
  getBaseUrl,
  getEnv
}
