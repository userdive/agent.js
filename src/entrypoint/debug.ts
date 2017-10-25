import * as Raven from 'raven-js'
import factory from '../global'
import Agent from '../agent'
import objectAssign = require('object-assign')

class DebugAgent extends Agent {
  create (projectId: string, options: any) {
    return super.create(
      projectId,
      objectAssign({}, options, { Raven: Raven })
    )
  }
}

factory(DebugAgent)
