/* @flow */
import EventBase from '../events'
import { validate } from '../browser'
import { TOUCH } from '../constants'

export default class TouchEvents extends EventBase {
  validate (): boolean {
    return validate(TOUCH)
  }
  dispatch (e: TouchEvent) {
    const self = this
    const t = e.changedTouches ? e.changedTouches[0] : e.touches[0]
    self.emit({ x: t.pageX, y: t.pageY })
  }
  on () {
    super.on('touchstart', this.dispatch, 'l')
    super.on('touchmove', this.dispatch, 'l')
    super.on('touchend', this.dispatch, 'a')
  }
}
