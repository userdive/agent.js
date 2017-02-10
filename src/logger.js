/* @flow */
import type { Raven } from './types'

type RavenOptions = {
  level: 'warning'
}

type CustomError = string | Error

export default class Logger {
  Raven: Raven
  constructor (Raven: Raven): void {
    if (Raven.isSetup()) {
      Raven.setRelease('USERDIVE_AGENT_VERSION')
      this.Raven = Raven
    }
  }
  capture (err: CustomError, options: ?RavenOptions): void {
    if (!this.Raven) {
      return
    }
    if (typeof err === 'string') {
      this.Raven.captureMessage(err, options)
      return
    }
    this.Raven.captureException(err, options)
  }
  error (err: CustomError): void {
    this.capture(err)
  }
  warning (err: CustomError): void {
    this.capture(err, {level: 'warning'})
  }
}
