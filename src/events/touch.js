/* @flow */
import EventBase from '../events'
import { validate } from '../browser'

export default class TouchEvents extends EventBase {
  validate (): boolean {
    return validate(['ontouchstart', 'ontouchmove', 'ontouchend'])
  }
  on () {
    function handler (e: TouchEvent) {
      const t = e.changedTouches[0]
      this.emit({ x: t.pageX, y: t.pageY })
    }
    super.on('touchstart', handler, 'l')
    super.on('touchmove', handler, 'l')
    super.on('touchend', handler, 'a')
  }
}
