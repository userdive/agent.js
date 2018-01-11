import { parseCommand } from './command'
import { Command } from './types'

const executer: any = {
  init: function (Agent: any) {
    executer.agent = Agent
    executer.commandQueue = []
    executer.agents = {}
  },
  run: function (args: any) {
    let cmd: Command[] = executer.parse(args)
    cmd = executer.commandQueue.concat(cmd)
    for (executer.commandQueue = []; cmd.length > 0;) {
      if (executer.execute(cmd[0])) {
        cmd.shift()
      } else {
        break
      }
    }
    executer.commandQueue = executer.commandQueue.concat(cmd)
    return executer
  },

  parse: function (queueCommand: any): Command[] {
    const commands: Command[] = []
    const command: Command = parseCommand(queueCommand)

    if (!command.callProvide) {
      commands.push(command)
      if (command.callCreate && !executer.agents[command.trackerName]) {
        executer.agents[command.trackerName] = new executer.agent()
      }
    } else {
      const name = Object.keys(executer.agents)[0]
      executer.agents[name].provide(...command.methodArgs)
    }
    return commands
  },
  execute: function (command: Command): boolean {
    const agent = executer.agents[command.trackerName]
    const args = command.methodArgs || {}
    if (command.callRequire) {
      return agent.require(...args)
    }
    if (command.pluginName) {
      agent.run(command.pluginName, command.methodName, ...args)
    } else {
      agent[command.methodName](...args)
    }
    return true
  }
}

export default function executerFactory (Agent: any): any {
  executer.init(Agent)
  return executer
}
