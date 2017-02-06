/* @flow */
import mitt from 'mitt'

import Logger from './logger'
import type { EventType } from './types'
import { validate } from './browser'
import { LISTENER, SCROLL } from './constants'
import warning from './warning'

type Handler = MouseEventHandler

export default class Events {
  logger: Logger
  mitt: mitt
  name: string
  observer: any
  type: EventType
  constructor (emitName: string, eventEmitter: mitt, eventObserver: any, logger: Logger): void {
    this.name = emitName
    this.mitt = eventEmitter
    this.logger = logger
    this.observer = eventObserver
  }
  validate (): boolean {
    warning('please override validate')
    return false
  }
  emit (data: {x: number, y: number}): void {
    if (data.x < 0 || data.y < 0 || !this.type) {
      this.logger.error(`failed emit (${data.x}, ${data.y}), ${this.type}`, {level: 'warning'})
      return
    }

    this.mitt.emit(this.name, Object.assign({}, data, {
      type: this.type,
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

    this.observer.subscribe(target, eventName, e => {
      try {
        handler(e)
      } catch (err) {
        this.logger.error(err)
      }
    })
    this.type = eventName
  }
  off (): void {
    this.observer.unsubscribeAll()
  }
}
