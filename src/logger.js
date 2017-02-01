/* @flow */
import type { Raven } from './types'
import { version } from '../package.json'

type RavenOptions = {}

export default class Logger {
  Raven: Raven
  constructor (Raven: Raven) {
    if (Raven.isSetup()) {
      Raven.setRelease(version)
      this.Raven = Raven
    }
  }
  error (err: string | Error, options?: RavenOptions): void {
    if (!this.Raven) {
      return
    }
    if (typeof err === 'string') {
      this.Raven.captureMessage(err, options)
      return
    }
    this.Raven.captureException(err, options)
  }
}
