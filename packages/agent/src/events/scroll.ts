import { getOffset, validate } from '../browser'
import { SCROLL, TOUCH } from '../constants'
import EventBase from '../events'
import { InteractionPoint } from '../types'

function getInterationPoint (w: Window): InteractionPoint {
  const { left, top } = getOffset(w)
  return {
    type: 'l',
    x: left + w.innerWidth / 2,
    y: top + w.innerHeight / 2
  }
}

const eventName = 'scroll'

export default class ScrollEvents extends EventBase<UIEvent> {
  public on () {
    super.on(
      eventName,
      () => {
        this.emit(getInterationPoint(window))
      }
    )
  }
  protected validate (): boolean {
    return validate(SCROLL.concat(['innerWidth', 'innerHeight']).concat(TOUCH))
  }
}
