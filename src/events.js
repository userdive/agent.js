/* @flow */
import EventEmitter from 'events'

import { error, warning, raise } from './logger'
import { LISTENER, SCROLL } from './constants'
import { validate, getOffset } from './browser'
import type { EventType, CustomError, InteractType } from './types'

type Handler = MouseEventHandler | TouchEventHandler

export default class Events {
  emitter: EventEmitter
  name: string
  observer: any
  eventName: EventType
  type: InteractType
  constructor (
    emitName: string,
    eventEmitter: EventEmitter,
    eventObserver: any
  ): void {
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
  emit (data: { x: number, y: number }): void {
    if (data.x < 0 || data.y < 0 || !this.type) {
      return
    }

    const { x, y } = getOffset(window)

    this.emitter.emit(
      this.name,
      Object.assign({}, data, {
        name: this.eventName,
        type: this.type,
        left: x,
        top: y
      })
    )
  }
  on (eventName: EventType, handler: Handler, type: InteractType): void {
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
    this.eventName = eventName
  }
  off (): void {
    this.observer.unsubscribeAll()
  }
}
