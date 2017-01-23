/* @flow */
import EventBase from './base'

export default class ClickEvents extends EventBase {
  bind () {
    super.bind(document, 'click', (e: MouseEvent) => {
      this.save({x: e.pageX, y: e.pageY})
    })
  }
}
