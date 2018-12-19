import { getOffset, validate } from '../browser'
import { SCROLL, TOUCH } from '../constants'
import EventBase from '../events'
import { Point } from '../types'

function getPotision (w: Window): Point {
  const { x, y } = getOffset(w)
  return { x: x + w.innerWidth / 2, y: y + w.innerHeight / 2 }
}

const eventName = 'scroll'

export default class ScrollEvents extends EventBase<UIEvent> {
  public on () {
    super.on(
      eventName,
      () => {
        this.emit(getPotision(window))
      },
      'l'
    )
  }
  protected validate (): boolean {
    return validate(SCROLL.concat(['innerWidth', 'innerHeight']).concat(TOUCH))
  }
}
