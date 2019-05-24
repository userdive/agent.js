import { FieldsObject } from 'userdive/lib/types'

import { warning } from './logger'

export type AgentClass = new (
  projectId: string,
  cookieDomain: string,
  fieldsObject: FieldsObject
) => void

const execute = (Agent: AgentClass, agents: { [key: string]: any }) => (
  cmd: string,
  ...args: any[]
) => {
  const [n, command] = cmd.split('.')
  if (n && command) {
    cmd = command
  }
  const trackerName: string = command ? n : 'default'
  /**
   * _ud('create', 'id', 'auto', { name: 'myTracker' })
   * _ud('create', 'id', 'auto', 'myTracker')
   * _ud('create', 'id', 'auto')
   */
  if (cmd === 'create') {
    if (typeof args[1] === 'object') {
      // _ud('create', 'id', { auto: true, name: 'myTracker' })
      args[2] = args[1]
      args[1] = args[1].auto && 'auto'
    }
    agents[
      (typeof args[2] === 'string' && args[2]) ||
        (typeof args[2] === 'object' && args[2].name) ||
        trackerName
    ] = new Agent(args[0], args[1], typeof args[2] === 'object' ? args[2] : {})
    return true
  }
  if (!agents[trackerName]) {
    return false
  }

  const [pluginName, pluginFunctionName]: string[] = cmd.split(':')
  if (pluginName && pluginFunctionName) {
    return agents[trackerName].run(pluginName, pluginFunctionName, ...args)
  }

  if (typeof agents[trackerName][cmd] === 'function') {
    return agents[trackerName][cmd](...args)
  }
}

export default function(
  Agent: any,
  agents: { [key: string]: any },
  name: string
) {
  const applyQueue = (delay: number) => {
    setTimeout(() => {
      if ((window as any)[name].q.length === 0) {
        ;(window as any)[name] = execute(Agent, agents)
        return
      }

      const next = (window as any)[name].q.shift()
      const [cmd, ...args] = [].map.call(next, (x: any) => x)

      const res = execute(Agent, agents)(cmd as string, ...args)
      if (!res) {
        delay++
        if (delay > 10) {
          ;(window as any)[name] = execute(Agent, agents)
          warning(`execute timeout: ${cmd}`)
          return
        }
        ;(window as any)[name](...next)
      }
      applyQueue(delay)
    }, delay * 100)
  }

  if ((window as any)[name] && (window as any)[name].q) {
    applyQueue(0)
  } else {
    ;(window as any)[name] = execute(Agent, agents)
  }
}
