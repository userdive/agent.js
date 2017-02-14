/* @flow */
import AgentCore from './core'
import Click from './events/click'
import Scroll from './events/scroll'
import { validate } from './browser'
import { OPTIONS, LISTENER } from './constants'
import type { SendType, State } from './types'

let agent: AgentCore

function create (projectId: string, options: any): AgentCore {
  agent = new AgentCore(
    projectId,
    [
      Click,
      Scroll
    ],
    Object.assign({}, OPTIONS, options)
  )
  return agent
}

function destroy () {
  agent.destroy()
}

function send (type: SendType): void {
  if (agent.loaded && type === 'pageview') {
    destroy()
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
    window.addEventListener('pagehide', destroy, false)
  }
}

finish()

export default {
  'create': create,
  'send': send,
  'set': set
}
