/* @flow */
import Raven from 'raven-js'
import factory from '../global'
import Agent from '../agent'

export class DebugAgent extends Agent {
  static create (projectId: string, options: any) {
    Object.assign({}, options, {Raven: Raven})
    return super.create(projectId, options)
  }
}

factory(DebugAgent)
