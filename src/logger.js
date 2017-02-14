/* @flow */
import type { CustomError } from './types'
type RavenOptions = {
  level: 'warning'
}

let RAVEN_DNS = ''
let Raven

export function raise (msg: string) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(msg)
  }
}

export function setup (DNS: string) {
  if (!RAVEN_DNS && DNS) {
    RAVEN_DNS = DNS
    install(window)
  }
}

function install (w: window) {
  if (!w.Raven || w.Raven.isSetup() || Raven) {
    return
  }
  try {
    Raven = w.Raven.noConflict()
    Raven.config(RAVEN_DNS).install()
    Raven.setRelease('USERDIVE_AGENT_VERSION')
  } catch (err) {
    raise(err)
  }
}

function capture (w: window, err: CustomError, options: ?RavenOptions): void {
  if (!Raven) {
    install(window)
  }
  if (Raven && Raven.isSetup()) {
    if (typeof err === 'string') {
      Raven.captureMessage(err, options)
      return
    }
    Raven.captureException(err, options)
  }
}

export function error (err: CustomError): void {
  capture(window, err)
}
export function warning (err: CustomError): void {
  capture(window, err, {level: 'warning'})
}
