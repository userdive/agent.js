import { RavenOptions, RavenStatic } from 'raven-js'

export type CustomError = string | Error

export const raise = (msg: string) => {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(msg)
  }
}

const isDefined = (instance: any): boolean => instance && instance.isSetup()

let Raven: any
export const setup = ({ Raven: raven }: { Raven?: RavenStatic }): boolean => {
  const isSetup = isDefined(raven)
  if (isSetup) {
    Raven = raven
    Raven.setRelease(process.env.VERSION as string)
  }
  return isSetup
}

const capture = (err: CustomError, options?: RavenOptions): void => {
  if (isDefined(Raven)) {
    if (typeof err === 'string') {
      Raven.captureMessage(err, options)
      return
    }
    Raven.captureException(err, options)
  }
}

export const error = (err: CustomError, extra?: RavenOptions): void => {
  capture(err, { level: 'error', extra })
}
export const warning = (err: CustomError, extra?: RavenOptions): void => {
  capture(err, { level: 'warning', extra })
}
