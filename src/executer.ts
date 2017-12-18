import { parseCommand } from './command'
import { Command } from './types'

const executer: any = {
  init: function (Agent: any) {
    executer.agent = Agent
    executer.commandQueue = []
    executer.agents = []
  }
}

executer.run = function () {
  let cmd: Command[] = executer.parse(arguments)
  cmd = executer.commandQueue.concat(cmd)
  for (executer.commandQueue = []; 0 < cmd.length;) {
    if (executer.execute(cmd[0])) cmd.shift()
  }
  executer.commandQueue = executer.commandQueue.concat(cmd)
}

executer.parse = function (queueCommand: any): Command[] {
  let commands: Command[] = []
  try {
    let command = parseCommand(queueCommand)
    if (command.callProvide) {
      // TODO call Agent.provide after create
    } else {
      commands.push(command)
      if (command.callRequire) {
        // TODO prepare require
      } else if (command.callCreate && !executer.agents[command.trackerName]) {
        executer.agents[command.trackerName] = new executer.agent()
      }
    }
  } catch (e) {
    // do nothing
  }
  return commands
}
executer.execute = function (command: Command): boolean {
  try {
    const agent = executer.agents[command.trackerName]
    const args = command.methodArgs || []
    if (command.pluginName) {
      agent.run(command.pluginName, args)
    } else {
      agent[command.methodName](...args)
    }
    return true
  } catch (e) {
    return false
  }
}

export default function executerFactory (Agent: any): any {
  executer.init(Agent)
  return executer
}
