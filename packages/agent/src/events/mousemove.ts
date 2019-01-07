import { validate } from '../browser'
import EventBase from '../events'

export default class MouseMoveEvents extends EventBase<MouseEvent> {
  public on () {
    super.on(
      'mousemove',
      (e: MouseEvent) => {
        this.emit({ type: 'l', x: e.pageX, y: e.pageY })
      }
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
