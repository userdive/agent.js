/* @flow */
import mitt from 'mitt'
import eventObserver from 'ui-event-observer'
import throttle from 'throttle-debounce/throttle'

import type { EventType } from './types'
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
  reduce (data: {x: number, y: number}): void {
    if (data.x < 0 || data.y < 0) {
      return
    }
    emitter.emit(EMIT_NAME, Object.assign({}, data, {type: EVENT_NAME}))
  }
  bind (global: Document | window, eventName: EventType, handler: Handler): void {
    if (!global || typeof handler !== 'function') {
      warning('please override bind')
      return
    }

    if (!this.validate()) {
      return
    }

    if (!EVENT_NAME) {
      EVENT_NAME = eventName
    }

    eventObserver.subscribe(global, EVENT_NAME, throttle(500, e => {
      try {
        handler(e)
      } catch (err) {
        this.logger.error(err)
      }
    }))
  }
  unbind (): void {
    eventObserver.unsubscribeAll()
  }
}
