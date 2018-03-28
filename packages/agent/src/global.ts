import { FieldsObject } from 'userdive/lib/types'
import { NAMESPACE } from './constants'

const agents: any = {}

type AgentClass = new (
  projectId: string,
  cookieDomain: string,
  fieldsObject: FieldsObject
) => void

const execute = (Agent: AgentClass) => (cmd: string, ...args: any[]) => {
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

  const [pluginName, pluginFunctionName]: string[] = cmd.split(':')
  if (pluginName && pluginFunctionName) {
    return (
      agents[trackerName].run(pluginName, pluginFunctionName, ...args) || true
    )
  }

  if (agents[trackerName] && typeof agents[trackerName][cmd] === 'function') {
    return agents[trackerName][cmd](...args) || true
  }
}

type Arguments = { [key: number]: any }

const toArray = (args: object) => [].map.call(args, (x: any) => x)

export default function (Agent: any) {
  const w: any = window
  const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
  const name = element.getAttribute(NAMESPACE) as string

  const applyQueue = (argsObject: any[], q: Arguments[]) => {
    if (!argsObject || !argsObject[0]) {
      return
    }
    const args = toArray(argsObject)
    const cmd = args.shift()
    const res = execute(Agent)(cmd, ...args)
    if (!res) {
      q.push(argsObject)
    }
    const [next, ...queue] = toArray(q)
    applyQueue(next, queue)
  }

  if (w[name] && w[name].q) {
    const { q } = w[name]
    const [next, ...queue] = toArray(q)
    applyQueue(next, queue)
  }
  w[name] = execute(Agent)
}
