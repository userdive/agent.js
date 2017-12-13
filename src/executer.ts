import Command from './command'

const executer: any = {
  init: function (Agent: any) {
    executer.agent = Agent
    executer.commandQueue = []
    executer.agents = []
  }
}

executer.run = function () {
  let cmd: Command[] = executer.parseCommand(arguments)
  cmd = executer.commandQueue.concat(cmd)
  for (executer.commandQueue = []; 0 < cmd.length;) {
    if (executer.execute(cmd[0])) cmd.shift()
  }
  executer.commandQueue = executer.commandQueue.concat(cmd)
}

executer.parseCommand = function (): Command[] {
  let commands: Command[] = []
  for (let i = 0; i < arguments.length; i++) {
    try {
      let command = new Command(arguments[i])
      if (command.callProvide) {
        // TODO call Agent.provide after create
        continue
      } else {
        commands.push(command)
        if (command.callRequire) {
          // TODO prepare require
        } else if (
          command.callCreate &&
          !executer.agents[command.trackerName]
        ) {
          executer.agents[command.trackerName] = new executer.agent()
        }
      }
    } catch (e) {
      // do nothing
    }
  }
  return commands
}
executer.execute = function (command: Command): boolean {
  try {
    const agent = executer.agents[command.trackerName]
    const args = command.methodArgs || []
    agent[command.methodName](...args)
    return true
  } catch (e) {
    return false
  }
}

export default function executerFactory (Agent: any): any {
  executer.init(Agent)
  return executer
}
