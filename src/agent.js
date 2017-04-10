/* @flow */
import { SETTINGS as SETTINGS_DEFAULT, LISTENER } from './constants'
import { validate } from './browser'
import AgentCore from './core'
import Click from './events/click'
import MouseMove from './events/mousemove'
import Scroll from './events/scroll'
import TouchEnd from './events/touch'
import type { SendType, State } from './types'

export default class Agent {
  _core: AgentCore
  /**
   * create singleton Agent instance
   * @param  {String} projectId generated from userdive
   * @param  {Object|'auto'} settings recommend 'auto'
   * @return {AgentCore} singleton instance
   */
  create (projectId: string, settings: any): AgentCore {
    if (typeof settings === 'string' && settings === 'auto') {
      settings = { auto: true }
    }
    this._core = new AgentCore(
      projectId,
      [
        Click,
        MouseMove,
        Scroll,
        TouchEnd
      ],
      Object.assign({}, SETTINGS_DEFAULT, settings)
    )
    if (validate(LISTENER.concat(['onpagehide']))) {
      window.addEventListener('pagehide', () => {
        this._core.destroy()
      }, false)
    }
    return this._core
  }
  send (type: SendType, page: ?string): AgentCore {
    if (this._core.active && type === 'pageview') {
      this._core.destroy()
    }
    this._core.send(type, page || location.href)
    return this._core
  }
  set (key: any, value?: string | number): State {
    if (key && value) {
      return this._core.set(key, value)
    }
    return this._core.mergeDeep(key)
  }
}
