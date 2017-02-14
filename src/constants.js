/* @flow */
import type { Options } from './types'

const intervals = [0]
function push (t: number, n: number): void {
  for (let i = 0; i < n; i++) {
    intervals.push(t)
  }
}
push(2, 20)
push(4, 20)
push(8, (30 * 60 - 120) / 8)

export const INTERACT = 30
export const INTERVAL = intervals.sort()
export const LISTENER = ['addEventListener', 'removeEventListener']
export const NAMESPACE = `data-userdive-namespace`
export const SCROLL = ['pageXOffset', 'pageYOffset']
export const VERSION = 1
export const OPTIONS: Options = {
  baseUrl: 'https://v1.userdive.com',
  cookieName: '_ud', // TODO
  cookieDomain: '',
  cookieExpires: 730, // TODO
  RAVEN_DSN: '',
  Raven: undefined
}
