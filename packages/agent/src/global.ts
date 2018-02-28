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

  const [trackerName, command] = cmd.split('.')
  if (trackerName && command) {
    cmd = command
  }
  return {
    cmd,
    args,
    name: command ? trackerName : 'default'
  }
}

const execute = (queue: any[], Agent: any): void => {
  const { cmd, args, name } = parse(queue)
  /**
   * _ud('create', 'id', 'auto', 'myTracker')
   * _ud('create', 'id', { name: 'myTracker' })
   * _ud('create', 'id', 'auto')
   */
  if (cmd === 'create') {
    agents[args[1] ? args[1].name : name] = new Agent(args[0], args[1])
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
  if (w[name] && w[name].q) {
    w[name].q.forEach((q: any[]) => execute(q, Agent))
    w[name] = execute
  }
}
