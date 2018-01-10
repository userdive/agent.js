import { raise } from './logger'
import { Command } from './types'

const commandParse: RegExp = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/

function validate (cmd: Command) {
  if (!cmd.methodName) {
    raise('invalid command')
  }
  if (cmd.callProvide && cmd.trackerName !== 'default') {
    raise('invalid provide cmd')
  }
}

export function parseCommand (queueCommand: any): Command {
  const cmd: any = {}
  if (typeof queueCommand[0] === 'function') {
    cmd.callback = queueCommand[0]
    return cmd
  }

  const command: RegExpExecArray | null = commandParse.exec(queueCommand[0])
  if (command !== null && command.length === 4) {
    cmd.trackerName = command[1] || 'default'
    cmd.pluginName = command[2] || ''
    cmd.methodName = command[3]
    cmd.methodArgs = [].slice.call(queueCommand, 1)
    if (!cmd.pluginName) {
      if (command[1]) {
        cmd.trackerName = command[3]
        cmd.methodName = command[1]
      }
      cmd.callCreate = cmd.methodName === 'create'
      cmd.callRequire = cmd.methodName === 'require'
      cmd.callProvide = cmd.methodName === 'provide'
    }
  }
  validate(cmd)
  return cmd
}
