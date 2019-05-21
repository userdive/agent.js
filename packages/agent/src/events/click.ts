import { validate } from '../browser'
import EventBase from '../events'

export default class ClickEvents extends EventBase<MouseEvent> {
  public on() {
    super.on('click', (e: MouseEvent) => {
      this.emit({ type: 'a', x: e.pageX, y: e.pageY })
    })
  }
  protected validate(): boolean {
    const enable = validate(['onclick'])
    if (!enable) {
      this.warning('disable click')
    }
    return enable
  }
}
