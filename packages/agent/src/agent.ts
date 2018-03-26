import * as objectAssign from 'object-assign'
import { FieldsObject, HitType } from 'userdive/lib/types'

import { validate } from './browser'
import { LISTENER, SETTINGS as SETTINGS_DEFAULT } from './constants'
import AgentCore from './core'
import Click from './events/click'
import MouseMove from './events/mousemove'
import Scroll from './events/scroll'
import TouchEnd from './events/touch'
import { setup } from './logger'
import { SettingFieldsObject, State } from './types'

export type PluginConstructor = new (
  tracker: Agent,
  pluginOptions?: Object
) => void
const PLUGINS = 'plugins'

export default class Agent {
  private core: AgentCore
  private linkerName: string
  private plugins: { [name: string]: any }

  constructor (
    projectId: string,
    cookieDomain: string,
    fieldsObject?: FieldsObject
  ) {
    this.plugins = {}
    const config = objectAssign(
      {},
      SETTINGS_DEFAULT,
      { cookieDomain },
      fieldsObject || {}
    ) as SettingFieldsObject

    this.core = new AgentCore(
      projectId,
      [Click, MouseMove, Scroll, TouchEnd],
      config
    )
    this.linkerName = config.linkerName

    setup(config)

    if (validate(LISTENER.concat(['onpagehide']))) {
      window.addEventListener(
        'pagehide',
        () => {
          this.core.send([], true)
        },
        false
      )
    }
  }

  send (type: HitType, data?: FieldsObject | string): AgentCore {
    if (typeof type !== 'string') {
      return this.core
    }
    switch (type) {
      case 'pageview':
        if (!data || typeof data === 'string') {
          this.core.pageview(data || location.href)
        }
        break
      case 'event':
        this.core.event(data as FieldsObject)
        break
    }

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

  provide (name: string, pluginConstructor: PluginConstructor) {
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
