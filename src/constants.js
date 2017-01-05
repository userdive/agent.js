/* @flow */
import type { Options } from './types'

export const VERSION = 1
export const OPTIONS: Options = {
  baseUrl: '',  // TODO
  cookieName: '_ud',
  cookieDomain: '',
  cookieExpires: 0
}

const product = 'userdive'
export const NAMESPACE = `data-${product}-namespace`
export const DATASET_KEY = `${product}Namespace`
