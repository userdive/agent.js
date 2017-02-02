/* @flow */
import mitt from 'mitt'
import eventObserver from 'ui-event-observer'
import throttle from 'throttle-debounce/throttle'

import type { EventType } from './types'
import { validate } from './browser'
import { LISTENER, SCROLL } from './constants'
import warning from './warning'

interface Logger {
  error(err: any): void
}

let emitter: mitt
let EMIT_NAME: string
let EVENT_NAME: EventType

type Handler = MouseEventHandler

export default class Events {
  logger: Logger
  constructor (emitName: string, eventEmitter: mitt, logger: Logger): void {
    EMIT_NAME = emitName
    emitter = eventEmitter
    this.logger = logger
  }
  validate (): boolean {
    warning('please override validate')
    return false
  }
  emit (data: {x: number, y: number}): void {
    if (data.x < 0 || data.y < 0) {
      return
    }

    emitter.emit(EMIT_NAME, Object.assign({}, data, {
      type: EVENT_NAME,
      left: window.scrollX,
      top: window.scrollY
    }))
  }
  on (target: HTMLElement | window, eventName: EventType, handler: Handler): void {
    if (!target || typeof handler !== 'function') {
      warning('please override on')
      return
    }

    if (!this.validate() || !validate(LISTENER.concat(SCROLL))) {
      return
    }

    if (!EVENT_NAME) {
      EVENT_NAME = eventName
    }

    eventObserver.subscribe(target, EVENT_NAME, throttle(0, e => {
      try {
        handler(e)
      } catch (err) {
        this.logger.error(err)
      }
    }))
  }
  off (): void {
    eventObserver.unsubscribeAll()
  }
}
