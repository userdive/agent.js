import * as Raven from 'raven-js'
import factory from '../global'
import Agent from '../agent'

class DebugAgent extends Agent {
  create (projectId: string, options: any) {
    return super.create(
      projectId,
      Object.assign({}, options, { Raven: Raven })
    )
  }
}

factory(DebugAgent)
