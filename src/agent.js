/* @flow */
import AgentCore from './core'
import Click from './events/click'
import Scroll from './events/scroll'
import TouchEnd from './events/touch'
import { validate } from './browser'
import { OPTIONS, LISTENER } from './constants'
import type { SendType, State } from './types'

let agent: AgentCore
function destroy () {
  agent.destroy()
}

export default class Agent {
  static create (projectId: string, options: any): AgentCore {
    agent = new AgentCore(
      projectId,
      [
        Click,
        Scroll,
        TouchEnd
      ],
      Object.assign({}, OPTIONS, options)
    )
    if (validate(LISTENER.concat(['onpagehide']))) {
      window.addEventListener('pagehide', destroy, false)
    }
    return agent
  }
  static send (type: SendType): void {
    if (agent.loaded && type === 'pageview') {
      destroy()
    }
    agent.send(type)
  }
  static set (key: any, value?: string | number): State {
    if (key && value) {
      return agent.set(key, value)
    }
    return agent.mergeDeep(key)
  }
}
