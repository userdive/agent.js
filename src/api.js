/* @flow */

import Core from './core'

type Options = {}

const create = (id: string, options: Options, baseUrl: string): Core => {
  const core = new Core(id, baseUrl) // TODO cache
  return core
}
const send = (type: string): void => {
  // TODO
}

module.exports = {
  create,
  send
}
