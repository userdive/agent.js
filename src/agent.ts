import { SETTINGS as SETTINGS_DEFAULT, LISTENER } from './constants'
import { validate } from './browser'
import AgentCore from './core'
import Click from './events/click'
import MouseMove from './events/mousemove'
import Scroll from './events/scroll'
import TouchEnd from './events/touch'
import { SendType, SetType, State } from './types'

export default class Agent {
  _core: AgentCore
  create (projectId: string, settings: Object | 'auto'): AgentCore {
    if (typeof settings === 'string' && settings === 'auto') {
      settings = { auto: true }
    }
    this._core = new AgentCore(
      projectId,
      [Click, MouseMove, Scroll, TouchEnd],
      Object.assign({}, SETTINGS_DEFAULT, settings)
    )
    if (validate(LISTENER.concat(['onpagehide']))) {
      window.addEventListener(
        'pagehide',
        () => {
          this._core.destroy(true)
        },
        false
      )
    }
    return this._core
  }
  send (type: SendType, page?: string): AgentCore {
    this._core.send(type, page || location.href)
    return this._core
  }
  set (key: SetType, value?: string | number): State {
    if (key && value) {
      return this._core.set(key, value)
    }
    return this._core.mergeDeep(key)
  }
}
