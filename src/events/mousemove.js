/* @flow */
import EventBase from '../events'
import { validate } from '../browser'

export default class MouseMoveEvents extends EventBase {
  validate (): boolean {
    const enable = validate(['onmousemove'], document.body)
    if (!enable) {
      this.warning('disable mousemove')
    }
    return enable
  }
  on () {
    super.on(document.body, 'mousemove', (e: MouseEvent) => {
      this.emit({x: e.pageX, y: e.pageY})
    })
  }
}
