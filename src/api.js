/* @flow */
import Core from './core'

type Options = {}

let core

const create = (id: string, options: Options, baseUrl: string): Core => {
  core = new Core(id, baseUrl) // TODO cache
  return core
}

const send = (args: any): void => {
  if (!core) {
    return
  }
  core.send(args[0], args[1])
}

module.exports = {
  create,
  send
}
