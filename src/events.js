/* @flow */
import mitt from 'mitt'
import eventObserver from 'ui-event-observer'

import type { EventType } from './types'
import { validate } from './browser'
import { LISTENER, SCROLL } from './constants'
import warning from './warning'

interface Logger {
  error(err: any): void
}

type Handler = MouseEventHandler

export default class Events {
  logger: Logger
  name: EventType
  emitter: mitt
  ename: string
  constructor (emitName: string, eventEmitter: mitt, logger: Logger): void {
    this.ename = emitName
    this.emitter = eventEmitter
    this.logger = logger
  }
  validate (): boolean {
    warning('please override validate')
    return false
  }
  emit (data: {x: number, y: number}): void {
    if (data.x < 0 || data.y < 0 || !this.name) {
      return
    }

    this.emitter.emit(this.ename, Object.assign({}, data, {
      type: this.name,
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

    eventObserver.subscribe(target, eventName, e => {
      try {
        handler(e)
      } catch (err) {
        this.logger.error(err)
      }
    })
    this.name = eventName
  }
  off (): void {
    eventObserver.unsubscribeAll()
  }
}
