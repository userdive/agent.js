import { TaskQueue } from './types'

const executer: any = {
  init: function (Agent: any) {
    this.agent = Agent
    this.commandQueue = []
    this.agents = {}
  },

  run: function (args: any) {
    let cmd: TaskQueue[] = this.parse(args)
    cmd = this.commandQueue.concat(cmd)
    for (this.commandQueue = []; cmd.length > 0;) {
      if (this.execute(cmd[0])) {
        cmd.shift()
      } else {
        break
      }
    }
    this.commandQueue = this.commandQueue.concat(cmd)
    return this
  },

  parse: function (command: any): TaskQueue[] {
    const commands: TaskQueue[] = []
    const tasks: any[] = []
    tasks.push.apply(tasks, command)
    const api = tasks.shift().split('.')
    const name = api.length === 2 ? api[1] : 'default'

    if (!this.agents[name]) {
      this.agents[name] = new executer.agent()
    }
    if (api[0] !== 'provide') {
      commands.push({ name: name, method: api[0], args: tasks })
    } else {
      const name = Object.keys(executer.agents)[0]
      this.agents[name][api[0]](...tasks)
    }
    return commands
  },

  execute: function (task: TaskQueue): boolean {
    const agent = this.agents[task.name]
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
