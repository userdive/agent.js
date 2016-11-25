/* @flow */
import Agent from './core'
import { OPTIONS } from './constants'
import type { Options, SendType, State } from './types'

let agent: Agent
let PROJECT_ID_CACHE: string
let OPTIONS_CACHE: Options

function create (projectId: string, options: Options): Agent {
  if (agent && agent.loaded) {
    agent.destory()
  }
  PROJECT_ID_CACHE = projectId
  OPTIONS_CACHE = Object.assign(OPTIONS, options)
  agent = new Agent(PROJECT_ID_CACHE, OPTIONS_CACHE)
  return agent
}

function send (type: SendType): void {
  if (!agent) {
    return
  }
  if (agent.loaded && PROJECT_ID_CACHE && OPTIONS_CACHE) {
    create(PROJECT_ID_CACHE, OPTIONS_CACHE)
  }
  agent.send(type)
}

function set (key: any, value?: string | number): State {
  if (key && value) {
    return agent.set(key, value)
  }
  return agent.setObject(key)
}

module.exports = {
  create,
  send,
  set
}
