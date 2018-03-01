import * as objectAssign from 'object-assign'

import { validate } from './browser'
import { LINKER, LISTENER, SETTINGS as SETTINGS_DEFAULT } from './constants'
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
    this.plugins = {}
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
          this.core.sendInteracts(true)
        },
        false
      )
    }
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

  get (key: string): string {
    return key === 'linkerParam' ? `${LINKER}=${this.core.get('userId')}` : ''
  }

  provide (name: string, pluginConstructor: ObjectConstructor) {
    this[PLUGINS][name] = pluginConstructor
  }

  require (pluginName: string, args: any): boolean {
    if (this[PLUGINS][pluginName]) {
      this[PLUGINS][pluginName] = new this[PLUGINS][pluginName](this, ...args)
      return true
    }
    return false
  }

  run (pluginName: string, methodName: string, ...args: any[]) {
    this.plugins[pluginName][methodName](...args)
  }

  subscribe (target: any, eventName: string, handler: Function): Function {
    return this.core.observer.subscribe(target, eventName, handler)
  }
}
