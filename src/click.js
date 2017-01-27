/* @flow */
import EventBase from './events'

export default class ClickEvents extends EventBase {
  validate (): boolean {
    // TODO
    return true
  }
  on () {
    super.on(document.body, 'click', (e: MouseEvent) => {
      this.emit({x: e.pageX, y: e.pageY})
    })
  }
}
