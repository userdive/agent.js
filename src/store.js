/* @flow */
import { uniqueId } from './utilities'
import { VERSION, CLIENT_VERSION } from './constants'
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
  return `${baseUrl}/${VERSION}/${projectId}/${clientId}/${loadTime}/`
}

const project = (id: string, url: string) => {
  projectId = id
  baseUrl = url
  clientId = uniqueId()  // TODO store cookie? storage
}

const getEnv = (): ClientEnvironments => {
  return {
    v: CLIENT_VERSION,
    wh: windowHeight,
    sh: screenHeight,
    sw: screenWidth,
    ww: windowWidth,
    h: height,
    w: width
  }
}

module.exports = {
  project,
  getBaseUrl,
  getEnv
}
