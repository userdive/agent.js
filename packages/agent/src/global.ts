import { NAMESPACE } from './constants'

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
  if (cmd === 'create') {
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

export default function (Agent: any) {
  const w: any = window
  const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
  const name = element.getAttribute(NAMESPACE) as string
  if (w[name] && w[name].q) {
    const { q } = w[name]
    q.forEach((args: any[]) => {
      const cmd = args[0]
      delete args[0]
      execute(Agent)(cmd, ...args)
    })
  }
  w[name] = execute(Agent)
}
