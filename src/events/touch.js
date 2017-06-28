/* @flow */
import EventBase from '../events'
import { validate } from '../browser'
import { TOUCH } from '../constants'

export default class TouchEvents extends EventBase {
  validate (): boolean {
    const enable = validate(TOUCH)
    if (!enable) {
      this.warning(`disable touch`)
    }
    return enable
  }
  on () {
    super.on(
      'touchstart',
      (e: TouchEvent) => {
        const t = e.changedTouches[0]
        this.emit({ x: t.pageX, y: t.pageY })
      },
      'l'
    )
    super.on(
      'touchmove',
      (e: TouchEvent) => {
        const t = e.changedTouches[0]
        this.emit({ x: t.pageX, y: t.pageY })
      },
      'l'
    )
    super.on(
      'touchend',
      (e: TouchEvent) => {
        const t = e.changedTouches[0]
        this.emit({ x: t.pageX, y: t.pageY })
      },
      'a'
    )
  }
}
