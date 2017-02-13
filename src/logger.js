/* @flow */
import type { CustomError } from './types'
type RavenOptions = {
  level: 'warning'
}

function capture (w: window, err: CustomError, options: ?RavenOptions): void {
  if (!(w.Raven && w.Raven.isSetup())) {
    return
  }
  w.Raven.setRelease('USERDIVE_AGENT_VERSION')
  if (typeof err === 'string') {
    w.Raven.captureMessage(err, options)
    return
  }
  w.Raven.captureException(err, options)
}

export function error (err: CustomError): void {
  capture(window, err)
}
export function warning (err: CustomError): void {
  capture(window, err, {level: 'warning'})
}
