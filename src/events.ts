import { EventEmitter } from 'events'
import { error, warning, raise } from './logger'
import { LISTENER, SCROLL } from './constants'
import { validate, getOffset } from './browser'
import { EventType, CustomError, InteractType } from './types'

export default class Events {
  emitter: EventEmitter
  name: string
  observer: any
  type: InteractType
  constructor (
    emitName: string,
    eventEmitter: EventEmitter,
    eventObserver: any
  ) {
    this.name = emitName
    this.emitter = eventEmitter
    this.observer = eventObserver
  }
  error (err: CustomError): void {
    error(err)
  }
  warning (err: CustomError): void {
    warning(err)
  }
  validate (): boolean {
    raise('please override validate')
    return false
  }
  emit (data: { x: number; y: number }): void {
    if (data.x < 0 || data.y < 0 || !this.type) {
      return
    }

    const { x, y } = getOffset(window)

    this.emitter.emit(
      this.name,
      Object.assign({}, data, {
        type: this.type,
        left: x,
        top: y
      })
    )
  }
  on (eventName: EventType, handler: Function, type: InteractType): void {
    if (typeof handler !== 'function' || !(type === 'a' || type === 'l')) {
      return raise('please override on')
    }

    if (!this.validate() || !validate(LISTENER.concat(SCROLL))) {
      return
    }

    this.observer.subscribe(window, eventName, e => {
      try {
        handler(e)
      } catch (err) {
        error(err)
      }
    })
    this.type = type
  }
  off (): void {
    this.observer.unsubscribeAll()
  }
}
