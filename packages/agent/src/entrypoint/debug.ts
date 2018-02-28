import * as objectAssign from 'object-assign'
import * as Raven from 'raven-js'
import Agent from '../agent'
import factory from '../global'

class DebugAgent extends Agent {
  constructor (projectId: string, options: Object) {
    super(projectId, objectAssign({}, options, { Raven }))
  }
}

factory(DebugAgent)
