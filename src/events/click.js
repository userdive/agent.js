/* @flow */
import EventBase from '../events'
import { validate } from '../browser'

export default class ClickEvents extends EventBase {
  validate (): boolean {
    const body: any = document.body
    return validate(['onclick'], body)
  }
  on () {
    super.on(document.body, 'click', (e: MouseEvent) => {
      this.emit({x: e.pageX, y: e.pageY})
    })
  }
}
