/* @flow */
import EventBase from '../events'
import { validate } from '../browser'
import { SCROLL } from '../constants'

export default class ScrollEvents extends EventBase {
  validate (): boolean {
    return validate(SCROLL)
  }
  on () {
    super.on(window, 'scroll', () => {
      const x = 0
      const y = 0
      this.emit({x: x, y: y})
    })
  }
}
