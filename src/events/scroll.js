/* @flow */
import EventBase from '../events'
import { validate } from '../browser'
import { SCROLL } from '../constants'
import type { Point } from '../types'

function getPotision (w: window): Point {
  const offsetX = w.scrollX || w.pageXOffset
  const offsetY = w.scrollY || w.pageYOffset
  return {x: offsetX + w.screenX, y: offsetY + (w.screenY / 2)}
}

export default class ScrollEvents extends EventBase {
  validate (): boolean {
    const enable = validate(SCROLL.concat(['pageYOffset', 'pageXOffset']))
    if (!enable) {
      this.warning('disable scroll')
    }
    return enable
  }
  on () {
    super.on(window, 'scroll', () => {
      this.emit(getPotision(window))
    })
  }
}
