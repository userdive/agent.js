/* @flow */
import EventBase from '../events'
import { validate } from '../browser'
import { SCROLL } from '../constants'
import type { Point } from '../types'

function getPotision (w: window): Point {
  return {x: w.pageXOffset + w.screenX, y: w.pageYOffset + (w.screenY / 2)}
}

export default class ScrollEvents extends EventBase {
  validate (): boolean {
    return validate(SCROLL.concat(['screenY', 'screenX']))
  }
  on () {
    super.on(window, 'scroll', () => {
      this.emit(getPotision(window))
    })
  }
}
