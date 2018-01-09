import * as objectAssign from 'object-assign'

import { validate } from './browser'
import { LISTENER, SETTINGS as SETTINGS_DEFAULT } from './constants'
import AgentCore from './core'
import Click from './events/click'
import MouseMove from './events/mousemove'
import Scroll from './events/scroll'
import TouchEnd from './events/touch'
import { SendType, State } from './types'

export default class Agent {
  private core: AgentCore
  private plugins: any // FIXME type
  constructor (projectId: string, settings: Object | 'auto') {
    this.plugins = {}
    this.create(projectId, settings)
  }
  create (projectId: string, settings: Object | 'auto'): AgentCore {
    if (typeof settings === 'string' && settings === 'auto') {
      settings = { auto: true }
    }
    this.core = new AgentCore(
      projectId,
      [Click, MouseMove, Scroll, TouchEnd],
      objectAssign({}, SETTINGS_DEFAULT, settings)
    )
    if (validate(LISTENER.concat(['onpagehide']))) {
      window.addEventListener(
        'pagehide',
        () => {
          this.core.destroy(true)
        },
        false
      )
    }
    return this.core
  }
  require (name: string) {
    this.plugins[name] = function () {
      this.plugins[name].q = (this.plugins[name].q || []).push(arguments)
    }
  }
  provide (name: string, PluginConstuctor: any /* FIXME type */): void {
    if (this.plugins[name] && this.plugins[name].q) {
      const [pluginName, ...args] = this.plugins[name].q
      this.plugins[pluginName] = new PluginConstuctor(...args)
    }
  }
  run (pluginName: string, methodName: string, ...args: any[]) {
    return this.plugins[pluginName][methodName](...args)
  }
  send (type: SendType, page?: string): AgentCore {
    this.core.send(type, page || location.href)
    return this.core
  }
  set (key: any, value?: string | number): State {
    if (key && value) {
      return this.core.set(key, value)
    }
    return this.core.mergeDeep(key)
  }
}
