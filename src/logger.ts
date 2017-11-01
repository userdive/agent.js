import * as ravenjs from 'raven-js'
import { CustomError } from './types'

let Raven: ravenjs.RavenStatic

export function raise (msg: string) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(msg)
  }
}

export function setup (DSN: string, raven?: ravenjs.RavenStatic): void {
  if (!DSN || !raven) {
    return
  }
  Raven = raven
  Raven.config(DSN).install()
  Raven.setRelease('USERDIVE_AGENT_VERSION')
}

function capture (err: CustomError, options?: ravenjs.RavenOptions): void {
  if (Raven && Raven.isSetup()) {
    if (typeof err === 'string') {
      Raven.captureMessage(err, options)
      return
    }
    Raven.captureException(err, options)
  }
}

export function error (err: CustomError, extra?: any): void {
  capture(err, { level: 'error', extra })
}
export function warning (err: CustomError, extra?: any): void {
  capture(err, { level: 'warning', extra })
}
