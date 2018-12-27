import { validate } from '../browser'
import { TOUCH } from '../constants'
import EventBase from '../events'

function getFirstTouch (e: TouchEvent): Touch {
  return e.changedTouches ? e.changedTouches[0] : e.touches[0]
}

export default class TouchEvents extends EventBase<TouchEvent> {
  private start: Touch
  private isTapEnable: boolean = false
  public on () {
    super.on(
      'touchstart',
      (e: TouchEvent) => {
        this.isTapEnable = true
        this.start = getFirstTouch(e)
        this.emit({ x: this.start.pageX, y: this.start.pageY })
      },
      'l'
    )

    super.on(
      'touchmove',
      (e: TouchEvent) => {
        this.isTapEnable = false
        const t = getFirstTouch(e)
        this.emit({ x: t.pageX, y: t.pageY })
      },
      'l'
    )

    super.on(
      'touchend',
      (e: TouchEvent) => {
        const t = getFirstTouch(e)
        if (!this.start) {
          return this.warning(`start is not defined`)
        }
        if (
          Math.abs(this.start.clientX - t.clientX) < 10 &&
          Math.abs(this.start.clientY - t.clientY) < 10 &&
          Math.abs(this.start.pageX - t.pageX) < 10 &&
          Math.abs(this.start.pageY - t.pageY) < 10 &&
          this.isTapEnable
        ) {
          this.emit({ x: t.pageX, y: t.pageY })
        }
      },
      'a'
    )
  }
  protected validate (): boolean {
    return validate(TOUCH)
  }
}
