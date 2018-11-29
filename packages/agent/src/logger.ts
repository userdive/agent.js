import { Severity } from '@sentry/types'
import { SettingFieldsObject } from './types'

export type CustomError = string | Error

export const raise = (msg: string) => {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(msg)
  }
  console.warn(msg)
}

let capture: (_: CustomError, level?: Severity) => void = function (_: CustomError) {
  // noting todo
}
export const setup = ({ captureException, captureMessage }: SettingFieldsObject): void => {
  capture = (err: CustomError, level?: Severity): void => {
    console.warn(err, level)
    if (typeof err === 'string') {
      captureMessage && captureMessage(err, level)
      return
    }
    captureException && captureException(err)
  }
}

export const error = (err: CustomError): void => capture(err, Severity.Error)
export const warning = (err: CustomError): void => capture(err, Severity.Warning)
