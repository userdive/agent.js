/* @flow */
import Core from './core'

type Options = {}

let agent

function create (id: string, options: Options, baseUrl: string): Core {
  agent = new Core(id, baseUrl) // TODO cache
  return agent
}

function send (type: string, viewName: string): void {
  if (!agent) {
    return
  }
  agent.send(type, viewName)
}

module.exports = {
  create,
  send
}
