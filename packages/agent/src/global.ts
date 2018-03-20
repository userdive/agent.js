import { NAMESPACE } from './constants'

const CREATE = 'create'
const agents: any = {}

const execute = (Agent: any) => (cmd: string, ...args: any[]): void => {
  const [n, command] = cmd.split('.')
  if (n && command) {
    cmd = command
  }
  const trackerName: string = command ? n : 'default'
  /**
   * _ud('create', 'id', { name: 'myTracker' })
   * _ud('create', 'id', 'auto', 'myTracker')
   * _ud('create', 'id', 'auto')
   */
  if (cmd === CREATE) {
    agents[
      args[2] || (typeof args[1] === 'object' && args[1].name) || trackerName
    ] = new Agent(args[0], args[1])
    return
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

export default function (Agent: any) {
  const w: any = window
  const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
  const name = element.getAttribute(NAMESPACE) as string
  const isCreateCmd = (isEqual: boolean) => ({ 0: cmd }: Arguments): boolean =>
    isEqual ? cmd === CREATE : cmd !== CREATE

  const applyQueue = (argsObject: any[]) => {
    const args = [].map.call(argsObject, (x: any) => x)
    const cmd = args.shift()
    execute(Agent)(cmd, ...args)
  }

  if (w[name] && w[name].q) {
    const { q } = w[name]
    q.filter(isCreateCmd(true)).forEach(applyQueue)
    q.filter(isCreateCmd(false)).forEach(applyQueue)
  }
  w[name] = execute(Agent)
}
