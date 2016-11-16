/* @flow */
import { uniqueId } from './utilities'
import { VERSION, API_VERSION } from './constants'
import type { ClientEnvironments } from './types'

let baseUrl: string
let clientId: string
let height: number
let loadTime: number
let projectId: string
let screenHeight: number
let screenWidth: number
let width: number
let windowHeight: number
let windowWidth: number

const getBaseUrl = () => {
  return `${baseUrl}/${API_VERSION}/${projectId}/${clientId}/${loadTime}/`
}

const setup = (id: string, url: string) => {
  projectId = id
  baseUrl = url
  clientId = uniqueId()  // TODO store cookie? storage
}

const getEnv = (): ClientEnvironments => {
  return {
    v: VERSION,
    sh: screenHeight,
    sw: screenWidth,
    wh: windowHeight,
    ww: windowWidth,
    h: height,
    w: width
  }
}

module.exports = {
  setup,
  getBaseUrl,
  getEnv
}
