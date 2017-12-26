import { Command } from './types'
import { raise } from './logger'

const commandParse: RegExp = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/

export function parseCommand (queueCommand: any): Command {
  const cmd: any = {}
  if ('function' === typeof queueCommand[0]) {
    cmd.callback = queueCommand[0]
  } else {
    const command: RegExpExecArray | null = commandParse.exec(queueCommand[0])
    if (command !== null && 4 === command.length) {
      cmd.trackerName = command[1] || 'default'
      cmd.pluginName = command[2] || ''
      cmd.methodName = command[3]
      cmd.methodArgs = [].slice.call(queueCommand, 1)
      if (!cmd.pluginName) {
        if (command[1]) {
          cmd.trackerName = command[3]
          cmd.methodName = command[1]
        }
        cmd.callCreate = 'create' === cmd.methodName
        cmd.callRequire = 'require' === cmd.methodName
        cmd.callProvide = 'provide' === cmd.methodName
      }
    }

    const target = queueCommand[1]
    if (!cmd.methodName) {
      raise('invalid command')
    } else if (cmd.callProvide && typeof target !== 'string') {
      raise('invalid command')
    }
    if (cmd.callProvide && 'default' !== cmd.trackerName) {
      raise('invalid provide cmd')
    }
  }
  return cmd
}
