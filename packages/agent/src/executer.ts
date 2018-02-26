import { TaskQueue } from './types'

const QUEUE = 'commandQueue'
const AGENTS = 'agents'

export default class Executer {
  private createAgent: Function
  private commandQueue: any[]
  private agents: any

  constructor (Agent: any) {
    this.createAgent = () => new Agent()
    this.commandQueue = []
    this.agents = {}
  }

  run (args: any) {
    let cmd: TaskQueue[] = this.parse(args)
    cmd = [...this[QUEUE], ...cmd]
    for (this[QUEUE] = []; cmd.length > 0;) {
      if (this.execute(cmd[0])) {
        cmd.shift()
      } else {
        break
      }
    }
    this[QUEUE] = [...this[QUEUE], ...cmd]
    return this
  }
  parse (command: any): TaskQueue[] {
    const commands: TaskQueue[] = []
    const tasks: any[] = []
    tasks.push.apply(tasks, command)
    const api = tasks.shift().split('.')
    const name = api.length === 2 ? api[1] : 'default'

    if (!this[AGENTS][name]) {
      this[AGENTS][name] = this.createAgent()
    }
    if (api[0] !== 'provide') {
      commands.push({ name: name, method: api[0], args: tasks })
    } else {
      const name = Object.keys(this[AGENTS])[0]
      this[AGENTS][name][api[0]](...tasks)
    }
    return commands
  }

  execute (task: TaskQueue): boolean {
    const agent = this.agents[task.name]
    if (task.method === 'require') {
      return agent.require(...task.args)
    }
    agent[task.method](...task.args)
    return true
  }
}
