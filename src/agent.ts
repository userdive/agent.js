import * as objectAssign from 'object-assign'

import { validate } from './browser'
import { LISTENER, SETTINGS as SETTINGS_DEFAULT } from './constants'
import AgentCore from './core'
import Click from './events/click'
import MouseMove from './events/mousemove'
import Scroll from './events/scroll'
import TouchEnd from './events/touch'
import { SendType, State } from './types'

const PLUGINS = 'plugins'

export default class Agent {
  private core: AgentCore
  private plugins: { [name: string]: any }
  constructor (projectId: string, settings: Object | 'auto') {
    this[PLUGINS] = {}
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
  require (pluginName: string, ...args: any[]) {
    this[PLUGINS][pluginName] = new this[PLUGINS][pluginName](...args)
  }
  provide (pluginName: string, PluginConstuctor: ObjectConstructor): void {
    this[PLUGINS][pluginName] = PluginConstuctor
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
