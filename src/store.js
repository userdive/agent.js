/* @flow */
import { uniqueId } from './utilities'
import { VERSION as v } from './constants'
import {
  screenHeight,
  screenWidth,
  windowHeight,
  windowWidth,
  resourceHeight,
  resourceWidth,
  timestamp
} from './alias'
import type { ClientEnvironments } from './types'

let baseUrl: string
let clientId: string
let projectId: string

let RESOURCE_HEIGHT: number
let RESOURCE_WIDTH: number

let loadTime: number

let SCREEN_HEIGHT: number
let SCREEN_WIDTH: number

let WINDOW_HEIGHT: number
let WINDOW_WIDTH: number

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
  RESOURCE_HEIGHT = resourceHeight()
  RESOURCE_WIDTH = resourceWidth()
  SCREEN_HEIGHT = screenHeight()
  SCREEN_WIDTH = screenWidth()
  WINDOW_WIDTH = windowWidth()
  WINDOW_HEIGHT = windowHeight()
}

function getEnv (): ClientEnvironments {
  // TODO validation
  return {
    v,
    sh: SCREEN_HEIGHT,
    sw: SCREEN_WIDTH,
    wh: WINDOW_HEIGHT,
    ww: WINDOW_WIDTH,
    h: RESOURCE_HEIGHT,
    w: RESOURCE_WIDTH
  }
}

module.exports = {
  setup,
  initialView,
  getBaseUrl,
  getEnv
}
