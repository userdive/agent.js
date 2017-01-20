/* @flow */
import EventBase from './base'

export default class ClickEvents extends EventBase {
  bind () {
    super.bind(document.body, 'click', (e: MouseEvent) => {
      this.change({x: e.pageX, y: e.pageY})
    })
  }
}
