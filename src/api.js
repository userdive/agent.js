/* @flow */
import Agent from './core'
import Click from './click'
import { validate } from './browser'
import { OPTIONS, LISTENER } from './constants'
import type { SendType, State } from './types'

let agent: Agent

function create (projectId: string, options: any): Agent {
  agent = new Agent(
    projectId,
    [
      Click
    ],
    Object.assign({}, OPTIONS, options)
  )
  return agent
}

function send (type: SendType): void {
  if (agent.loaded && type === 'pageview') {
    agent.destroy()
  }
  agent.send(type)
}

function set (key: any, value?: string | number): State {
  if (key && value) {
    return agent.set(key, value)
  }
  return agent.mergeDeep(key)
}

function finish () {
  if (validate(LISTENER.concat(['onpagehide']))) {
    window.addEventListener('pagehide', () => {
      agent.destroy()
    }, false)
  }
}

finish()

export default {
  'create': create,
  'send': send,
  'set': set
}
