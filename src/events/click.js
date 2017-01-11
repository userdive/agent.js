/* @flow */
import Events from '../events'

export default class ClickEvents extends Events {
  bind () {
    super.bind(document, 'click', (e: MouseEvent) => {
      this.change({x: e.pageX, y: e.pageY})
    })
  }
}
