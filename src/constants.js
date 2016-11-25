/* @flow */
import type { Options } from './types'

type CONSTANTS = {
  VERSION: number,
  GLOBAL: string,
  OPTIONS: Options
}

const constants: CONSTANTS = {
  VERSION: 1,
  GLOBAL: 'USERDIVEObject',
  OPTIONS: {
    baseUrl: '',  // TODO
    cookieName: '_ud',
    cookieExpires: 0
  }
}

module.exports = constants
