import { RavenOptions, RavenStatic } from 'raven-js'

export type CustomError = string | Error

export function raise (msg: string) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(msg)
  }
}

const isDefined = (instance: any): boolean => instance && instance.isSetup()

let Raven: any
export function setup ({ Raven: raven }: { Raven?: RavenStatic }): boolean {
  const isSetup = isDefined(raven)
  if (isSetup) {
    Raven = raven
    Raven.setRelease(process.env.VERSION as string)
  }
  return isSetup
}

function capture (err: CustomError, options?: RavenOptions): void {
  if (isDefined(Raven)) {
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
