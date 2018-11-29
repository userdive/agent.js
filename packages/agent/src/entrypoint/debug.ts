import { captureException, captureMessage, init } from '@sentry/browser'
import Agent from '../agent'
import { getName } from '../browser'
import factory from '../global'
import { SettingFieldsObject } from '../types'

class DebugAgent extends Agent {
  constructor (
    projectId: string,
    cookieName: string,
    options: SettingFieldsObject
  ) {
    init({
      dsn: process.env.RAVEN_DSN as string,
      release: process.env.VERSION as string
    })
    options = {
      ...options,
      captureException,
      captureMessage
    }
    super(projectId, cookieName, options)
  }
}

factory(DebugAgent, {}, getName(document))
