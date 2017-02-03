/* @flow */
import type { Options } from './types'

export const LISTENER = ['addEventListener', 'removeEventListener']
export const SCROLL = ['pageXOffset', 'pageYOffset']

export const INTERACT = 30
export const INTERVAL = [0, 2, 2, 4, 4, 8, 8, 16] // TODO
export const NAMESPACE = `data-userdive-namespace`
export const SESSION_TIME = 30
export const VERSION = 1
export const OPTIONS: Options = {
  baseUrl: 'https://v1.userdive.com',
  cookieName: '_ud', // TODO
  cookieDomain: '',
  cookieExpires: 730, // TODO
  Raven: {
    isSetup: () => false,
    setRelease: () => {},
    captureException: () => {},
    captureMessage: () => {}
  }
}
