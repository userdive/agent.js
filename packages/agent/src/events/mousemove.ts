import { validate } from '../browser'
import EventBase from '../events'

export default class MouseMoveEvents extends EventBase {
  on () {
    super.on(
      'mousemove',
      (e: MouseEvent) => {
        this.emit({ x: e.pageX, y: e.pageY })
      },
      'l'
    )
  }
  protected validate (): boolean {
    const enable = validate(['onmousemove'])
    if (!enable) {
      this.warning('disable mousemove')
    }
    return enable
  }
}
