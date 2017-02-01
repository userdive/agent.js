/* @flow */
import type { Options } from './types'

export const NAMESPACE = `data-userdive-namespace`
export const VERSION = 1
export const SESSION_TIME = 30
export const INTERACT = 30
export const INTERVAL = [0, 2, 2, 4, 4, 8, 8, 16] // TODO
export const OPTIONS: Options = {
  baseUrl: 'https://v1.userdive.com',
  cookieName: '_ud', // TODO
  cookieDomain: '',
  cookieExpires: 730, // TODO
  Raven: {
    isSetup: () => false,
    captureException: () => {},
    captureMessage: () => {}
  }
}
