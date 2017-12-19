import { isFunction, isString } from 'util'
import { Command } from './types'

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
        cmd.callCreate = 'create' === cmd.methodName
        cmd.callRequire = 'require' === cmd.methodName
        cmd.callProvide = 'provide' === cmd.methodName
      }
    }

    const target = queueCommand[1]
    const targetOption = queueCommand[2]
    if (!cmd.methodName) {
      throw new Error('invalid command')
    } else if (
      cmd.callProvide &&
      !isString(target) &&
      !isFunction(targetOption)
    ) {
      throw new Error('invalid command')
    }
    if (cmd.callProvide && 'default' !== cmd.trackerName) {
      throw new Error('invalid provide cmd')
    }
  }
  return cmd
}
