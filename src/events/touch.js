/* @flow */
import EventBase from '../events'
import { validate } from '../browser'

export default class TouchEvents extends EventBase {
  validate (): boolean {
    return validate(['ontouchend'])
  }
  on () {
    super.on('touchend', (e: TouchEvent) => {
      const t = e.changedTouches[0]
      this.emit({x: t.pageX, y: t.pageY})
    })
  }
}
