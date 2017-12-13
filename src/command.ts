import { isFunction, isString } from 'util'

const commandParse: RegExp = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/

export default class Command {
  callback: string
  trackerName: string
  pluginName: string
  methodName: string
  methodArgs: any[]
  callCreate: boolean
  callRequire: boolean
  callProvide: boolean
  constructor (queueCommand: any) {
    if ('function' === typeof queueCommand[0]) {
      this.callback = queueCommand[0]
    } else {
      const command: RegExpExecArray | null = commandParse.exec(
        queueCommand[0]
      )
      if (command !== null && 4 === command.length) {
        this.trackerName = command[1] || 'default'
        this.pluginName = command[2] || ''
        this.methodName = command[3]
        this.methodArgs = [].slice.call(queueCommand, 1)
        if (!this.pluginName) {
          this.callCreate = 'create' === this.methodName
          this.callRequire = 'require' === this.methodName
          this.callProvide = 'provide' === this.methodName
        }
      }

      const target = queueCommand[1]
      const targetOption = queueCommand[2]
      if (!this.methodName) throw new Error('invalid command')
      if (
        this.callProvide &&
        (!isFunction(target) || '' === target || !isString(targetOption))
      ) {
        throw new Error('invalid command')
      }
      if (this.callProvide && 'default' !== this.trackerName) {
        throw new Error('invalid provide commnad')
      }
    }
  }
}
