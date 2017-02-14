/* @flow */
import Agent from './agent'
import Raven from 'raven-js'

export class DebugAgent extends Agent {
  static create (projectId: string, options: any) {
    Object.assign({}, options, {Raven: Raven})
    return super.create(projectId, options)
  }
}

export default Agent
