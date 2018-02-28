import { NAMESPACE } from './constants'

const agents: any = {}

const parse = (
  queue: any[]
): {
  cmd: string
  args: any[]
  name: string
} => {
  let args = []
  let cmd = queue[0]

  if (queue.length > 1) {
    [cmd, args] = queue
  }

  const [command, name] = cmd.split('.')
  if (name) {
    return {
      cmd: command,
      args,
      name
    }
  }
  return {
    cmd,
    args,
    name: 'default'
  }
}

const execute = (queue: any[], Agent: any): void => {
  const { cmd, args, name } = parse(queue)
  /**
   * _ud('create', 'id', 'auto', 'myTracker') Valid
   * _ud('create.myTracker', 'id', 'auto') Old syntax
   * _ud('create', 'id', 'auto') Valid
   */
  if (cmd === 'create' && (name || args[1])) {
    agents[args[1] || name] = new Agent(args[0])
    return
  }
  if (typeof agents[name][cmd] === 'function') {
    return agents[name][cmd](...args)
  }
}

export default function (Agent: any) {
  const w: any = window
  const element: any = document.querySelector(`[${NAMESPACE}]`)
  const name: string = element.getAttribute(NAMESPACE)
  const res: any = []
  if (w[name] && w[name].q) {
    w[name].q.forEach((q: any[]) => res.push(execute(q, Agent)))
    w[name] = execute
  }
  return res
}
