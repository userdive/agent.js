import { TaskQueue } from './types'

const QUEUE = 'commandQueue'
const AGENTS = 'agents'

const executer: any = {
  init: function (Agent: any) {
    this.agent = Agent
    this[QUEUE] = []
    this[AGENTS] = {}
  },

  run: function (args: any) {
    let cmd: TaskQueue[] = this.parse(args)
    cmd = this[QUEUE].concat(cmd)
    for (this[QUEUE] = []; cmd.length > 0;) {
      if (this.execute(cmd[0])) {
        cmd.shift()
      } else {
        break
      }
    }
    this[QUEUE] = this[QUEUE].concat(cmd)
    return this
  },

  parse: function (command: any): TaskQueue[] {
    const commands: TaskQueue[] = []
    const tasks: any[] = []
    tasks.push.apply(tasks, command)
    const api = tasks.shift().split('.')
    const name = api.length === 2 ? api[1] : 'default'

    if (!this[AGENTS][name]) {
      this[AGENTS][name] = new executer.agent()
    }
    if (api[0] !== 'provide') {
      commands.push({ name: name, method: api[0], args: tasks })
    } else {
      const name = Object.keys(this[AGENTS])[0]
      this[AGENTS][name][api[0]](...tasks)
    }
    return commands
  },

  execute: function (task: TaskQueue): boolean {
    const agent = this[AGENTS][task.name]
    if (task.method === 'require') {
      return agent.require(...task.args)
    }
    agent[task.method](...task.args)

    return true
  }
}

export default function executerFactory (Agent: any): any {
  executer.init(Agent)
  return executer
}
