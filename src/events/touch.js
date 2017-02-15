/* @flow */
import EventBase from '../events'
import { validate } from '../browser'

export default class ClickEvents extends EventBase {
  validate (): boolean {
    const enable = validate(['ontouchend'])
    if (!enable) {
      this.warning('disable touch')
    }
    return enable
  }
  on () {
    super.on(window, 'touchend', (e: TouchEvent) => {
      const t = e.changedTouches[0]
      this.emit({x: t.pageX, y: t.pageY})
    })
  }
}
