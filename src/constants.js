/* @flow */
import type { Options } from './types'

export const NAMESPACE = `data-userdive-namespace`
export const VERSION = 1
export const INTERVAL = [2000] // TODO
export const OPTIONS: Options = {
  baseUrl: 'https://v1.userdive.com',
  cookieName: '_ud', // TODO
  cookieDomain: '',
  cookieExpires: 0,
  Raven: {
    isSetup: () => false,
    captureException: () => {},
    captureMessage: () => {}
  }
}
