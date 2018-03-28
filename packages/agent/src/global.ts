import { FieldsObject } from 'userdive/lib/types'
import { NAMESPACE } from './constants'
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
      args[1] = args[1].auto || args[1].cookieName
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

type Arguments = { [key: number]: any }

const obj2array = (args: object) => [].map.call(args, (x: any) => x)

export default function (Agent: any) {
  const lazyStack: { [key: string]: number } = {}
  const agents: { [key: string]: any } = {}
  const w: any = window
  const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
  const name = element.getAttribute(NAMESPACE) as string

  const applyQueue = (argsObject: any[], q: Arguments[]) => {
    if (!argsObject || !argsObject[0]) {
      return
    }
    const args = obj2array(argsObject)
    const cmd = args.shift()

    if (typeof lazyStack[cmd] !== 'number') {
      lazyStack[cmd] = 0
    }

    setTimeout(() => {
      const res = execute(Agent, agents)(cmd, ...args)
      if (!res) {
        lazyStack[cmd]++
        lazyStack[cmd] < 5
          ? q.push(argsObject)
          : warning(`execute timeout: ${cmd}`)
      }
      const [next, ...queue] = obj2array(q)
      applyQueue(next, queue)
    }, lazyStack[cmd] * 100)
  }

  if (w[name] && w[name].q) {
    const [next, ...queue] = obj2array(w[name].q)
    applyQueue(next, queue)
  }
  w[name] = execute(Agent, agents)
}
