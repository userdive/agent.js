/* @flow */
import Core from './core'

type Options = {}

let core

const create = (id: string, options: Options, baseUrl: string): Core => {
  core = new Core(id, baseUrl) // TODO cache
  return core
}

const send = (type: string): void => {
  if (!core) {
    return
  }
}

module.exports = {
  create,
  send
}
