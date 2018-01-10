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
  private plugins: { [name: string]: any }

  constructor () {
    this.plugins = {}
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
  provide (name: string, pluginConstructor: ObjectConstructor) {
    this.plugins[name] = pluginConstructor
  }

  require (pluginName: string, options: any): boolean {
    if (this.plugins[pluginName]) {
      const opt: any = options || {}
      this.plugins[pluginName] = new this.plugins[pluginName](this, opt)
      return true
    }
    return false
  }

  run (pluginName: string, methodName: string, ...args: any[]) {
    const plugin = this.plugins[pluginName]
    plugin[methodName](...args)
  }

  getCore (): AgentCore {
    return this.core
  }

  getPlugin (name: string): any {
    return this.plugins[name]
  }
}
