import * as objectAssign from 'object-assign'
import * as Raven from 'raven-js'
import Agent from '../agent'
import factory from '../global'

class DebugAgent extends Agent {
  create (projectId: string, options: any) {
    return super.create(projectId, objectAssign({}, options, { Raven: Raven }))
  }
}

factory(DebugAgent)
