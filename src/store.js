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

let BASE_URL: string
let CLIENT_ID: string
let LOAD_TIME: number
let PROJECT_ID: string

let RESOURCE_HEIGHT: number
let RESOURCE_WIDTH: number

let SCREEN_HEIGHT: number
let SCREEN_WIDTH: number

let WINDOW_HEIGHT: number
let WINDOW_WIDTH: number

function getBaseUrl (): string {
  // TODO validation
  return `${BASE_URL}/${PROJECT_ID}/${CLIENT_ID}/${LOAD_TIME}/`
}

function setup (id: string, url: string): void {
  PROJECT_ID = id
  BASE_URL = url
  CLIENT_ID = uniqueId()  // TODO store cookie? storage
}

function initialView (): void {
  LOAD_TIME = timestamp()
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
