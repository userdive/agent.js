import * as objectAssign from 'object-assign'
import { EventFieldsObject, FieldsObject, HitType } from 'userdive/lib/types'

import { getLocation, validate } from './browser'
import { LISTENER, SETTINGS as SETTINGS_DEFAULT } from './constants'
import AgentCore from './core'
import Click from './events/click'
import MouseMove from './events/mousemove'
import Scroll from './events/scroll'
import TouchEnd from './events/touch'
import { setup } from './logger'
import { SettingFieldsObject, SetType, State } from './types'

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

  send (type: HitType | FieldsObject, data?: FieldsObject | string): AgentCore {
    if (typeof type === 'object') {
      data = type
      type = type.hitType as HitType
    }
    let page
    if (typeof data === 'object') {
      page = this.set(data).env.l
    }
    switch (type) {
      // _ud('send', 'pageview')
      // _ud('send', 'pageview', internet.url())
      // _ud('send', 'pageview', { page: internet.url() })
      case 'pageview':
        this.core.pageview(
          (typeof page === 'string' ? page : (data as string)) ||
            getLocation().href
        )
        break
      case 'event':
        this.core.event(data as EventFieldsObject)
        break
    }

    return this.core
  }

  set (key: SetType | FieldsObject, value?: string | number): State {
    if (typeof key === 'string' && value) {
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
    return this[PLUGINS][name]
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

  run (pluginName: string, methodName: string, ...args: any[]): boolean {
    const p = this[PLUGINS][pluginName]
    if (p && p[methodName]) {
      const res = p[methodName](...args)
      return res === undefined ? true : !!res
    }
    return false
  }

  subscribe (target: any, eventName: string, handler: Function): Function {
    return this.core.observer.subscribe(target, eventName, handler)
  }
}
