/* @flow */
import Agent from './core'
import { OPTIONS } from './constants'
import type { SendType, State } from './types'

let agent: Agent

function create (projectId: string, options: any): Agent {
  agent = new Agent(projectId, Object.assign({}, OPTIONS, options))
  return agent
}

function send (type: SendType): void {
  if (!agent) {
    return
  }
  if (agent.loaded) {
    agent.destory()
  }
  agent.send(type)
}

function set (key: any, value?: string | number): State {
  if (key && value) {
    return agent.set(key, value)
  }
  return agent.setObject(key)
}

export default {
  create,
  send,
  set
}
