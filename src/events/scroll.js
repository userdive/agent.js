/* @flow */
import EventBase from '../events'
import { validate, getOffset } from '../browser'
import { SCROLL } from '../constants'
import type { Point } from '../types'

function getPotision (w, window): Point {
  const { x, y } = getOffset(w)
  return { x: x + w.innerWidth / 2, y: y + w.innerHeight / 2 }
}

export default class ScrollEvents extends EventBase {
  validate (): boolean {
    const enable =
      validate(
        SCROLL.concat([
          'pageYOffset',
          'pageXOffset',
          'innerWidth',
          'innerHeight'
        ])
      ) && !validate(['ontouchend'])
    if (!enable) {
      this.warning('disable scroll')
    }
    return enable
  }
  on () {
    super.on(
      'scroll',
      () => {
        this.emit(getPotision(window))
      },
      'l'
    )
  }
}
