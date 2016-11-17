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

let H: number
let W: number

let loadTime: number

let SH: number
let SW: number

let WH: number
let WW: number

const getBaseUrl = () => {
  // TODO validation
  return `${baseUrl}/${projectId}/${clientId}/${loadTime}/`
}

const setup = (id: string, url: string) => {
  projectId = id
  baseUrl = url
  clientId = uniqueId()  // TODO store cookie? storage
}

function initialView () {
  loadTime = timestamp()
  H = h()
  W = w()
  SH = sh()
  SW = sw()
  WH = wh()
  WW = ww()
}

function getEnv (): ClientEnvironments {
  // TODO validation
  return {
    v,
    sh: SH,
    sw: SW,
    wh: WH,
    ww: WW,
    h: H,
    w: W
  }
}

module.exports = {
  setup,
  initialView,
  getBaseUrl,
  getEnv
}
