/* @flow */
import EventBase from './events'

export default class ClickEvents extends EventBase {
  validate (): boolean {
    // TODO
    return true
  }
  bind () {
    super.bind(document, 'click', (e: MouseEvent) => {
      this.reduce({x: e.pageX, y: e.pageY})
    })
  }
}
