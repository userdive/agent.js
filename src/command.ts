import * as objectAssign from 'object-assign'
import { raise } from './logger'
import { Command } from './types'

const commandRegExp: RegExp = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/

function agentCommand (regexpExec: RegExpExecArray, cmd: Command): Command {
  if (regexpExec[1]) {
    objectAssign(cmd, {
      trackerName: regexpExec[3],
      methodName: regexpExec[1]
    })
  }
  cmd.callCreate = cmd.methodName === 'create'
  cmd.callRequire = cmd.methodName === 'require'
  cmd.callProvide = cmd.methodName === 'provide'
  return cmd
}

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
    return objectAssign(cmd, { callback: queueCommand[0] })
  }
  const regexpExec: RegExpExecArray | null = commandRegExp.exec(queueCommand[0])
  if (regexpExec && regexpExec.length === 4) {
    objectAssign(cmd, {
      trackerName: regexpExec[1] || 'default',
      pluginName: regexpExec[2] || '',
      methodName: regexpExec[3],
      methodArgs: [].slice.call(queueCommand, 1)
    })
    if (!cmd.pluginName) {
      objectAssign(cmd, agentCommand(regexpExec, cmd))
    }
  }
  validate(cmd)
  return cmd
}
