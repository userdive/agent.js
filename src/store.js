/* @flow */
import cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import { VERSION as v, COOKIE } from './constants'
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

let ENV: ClientEnvironments

let BASE_URL: string
let CLIENT_ID: string
let LOAD_TIME: number
let PROJECT_ID: string

function createBaseUrl (): string {
  // TODO validation
  return `${BASE_URL}/${PROJECT_ID}/${CLIENT_ID}/${LOAD_TIME}`
}

function findOrCreateClientId (): string {
  try {
    const c = cookies.get(COOKIE)
    if (c) {
      return c
    }
  } catch (err) {
    // TODO logger
    throw err
  }
  return uuid().replace(/-/g, '')
}

function setup (id: string, url: string): void {
  PROJECT_ID = id
  BASE_URL = url
  CLIENT_ID = findOrCreateClientId()
}

function initialView (): ClientEnvironments {
  LOAD_TIME = timestamp()
  ENV = {
    v,
    sh: screenHeight(),
    sw: screenWidth(),
    wh: windowHeight(),
    ww: windowWidth(),
    h: resourceHeight(),
    w: resourceWidth()
  }
  return ENV
}

function createEnvRequestUrl (): string {
  let query = '?'
  for (const key in ENV) {
    query += `${key}=${ENV[key]}`
  }
  query.replace(/&$/, '')
  return `${createBaseUrl()}${query}`
}

module.exports = {
  setup,
  initialView,
  createEnvRequestUrl
}
