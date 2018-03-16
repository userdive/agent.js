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
  private linkerName: string
  private plugins: { [name: string]: any }

  constructor (projectId: string, settings: Object | 'auto') {
    this.plugins = {}
    if (typeof settings === 'string' && settings === 'auto') {
      settings = { auto: true }
    }
    const config = objectAssign({}, SETTINGS_DEFAULT, settings)
    this.core = new AgentCore(
      projectId,
      [Click, MouseMove, Scroll, TouchEnd],
      config
    )
    this.linkerName = config.linkerName
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
    return key === 'linkerParam'
      ? `${this.linkerName}=${this.core.get('userId')}`
      : ''
  }

  provide (
    name: string,
    pluginConstructor: new (tracker: Agent, pluginOptions?: Object) => void
  ) {
    this[PLUGINS][name] = pluginConstructor
  }

  require (pluginName: string, pluginOptions?: any): boolean {
    if (this[PLUGINS][pluginName]) {
      this[PLUGINS][pluginName] = new this[PLUGINS][pluginName](
        this,
        pluginOptions
      )
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
