/* @flow */
import type { CustomError } from './types'

type RavenOptions = {
  level: 'warning' | 'error',
  extra: ?Object
}

let Raven

export function raise (msg: string) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(msg)
  }
}

export function setup (DSN: string, raven: any) {
  if (!DSN || !raven) {
    return
  }
  Raven = raven
  Raven.config(DSN).install()
  Raven.setRelease('USERDIVE_AGENT_VERSION')
}

function capture (w: window, err: CustomError, options: ?RavenOptions): void {
  if (Raven && Raven.isSetup()) {
    if (typeof err === 'string') {
      Raven.captureMessage(err, options)
      return
    }
    Raven.captureException(err, options)
  }
}

export function error (err: CustomError, extra: ?Object): void {
  capture(window, err, {level: 'error', extra})
}
export function warning (err: CustomError, extra: ?Object): void {
  capture(window, err, {level: 'warning', extra})
}
