import EventBase from '../events'
import { validate, getOffset } from '../browser'
import { SCROLL, TOUCH } from '../constants'
import { Point } from '../types'

function getPotision (w: Window): Point {
  const { x, y } = getOffset(w)
  return { x: x + w.innerWidth / 2, y: y + w.innerHeight / 2 }
}

const eventName = 'scroll'

export default class ScrollEvents extends EventBase {
  validate (): boolean {
    return validate(SCROLL.concat(['innerWidth', 'innerHeight']).concat(TOUCH))
  }

  on () {
    super.on(
      eventName,
      () => {
        this.emit(getPotision(window))
      },
      'l'
    )
  }
}
