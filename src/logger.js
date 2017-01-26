/* @flow */
import type { Raven } from './types'

type RavenOptions = {}

export default class Logger {
  Raven: Raven
  constructor (Raven: Raven) {
    this.Raven = Raven
  }
  error (err: string | Error, options?: RavenOptions): void {
    if (!this.Raven.isSetup()) {
      return
    }

    if (typeof err === 'string') {
      this.Raven.captureMessage(err, options)
      return
    }
    this.Raven.captureException(err, options)
  }
}
