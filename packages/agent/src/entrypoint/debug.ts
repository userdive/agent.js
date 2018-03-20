import * as Raven from 'raven-js'
import Agent from '../agent'
import factory from '../global'

Raven.config(process.env.RAVEN_DSN as string).install()

class DebugAgent extends Agent {
  constructor (projectId: string, options: any) {
    options['Raven'] = Raven
    super(projectId, options)
  }
}

factory(DebugAgent)
