/* @flow */
import EventBase from '../events'
import { validate } from '../browser'

export default class ClickEvents extends EventBase {
  validate (): boolean {
    const body: any = document.body
    const enable = validate(['onclick'], body)
    if (!enable) {
      this.warning('disable click')
    }
    return enable
  }
  on () {
    super.on(document.body, 'click', (e: MouseEvent) => {
      this.emit({x: e.pageX, y: e.pageY})
    })
  }
}
