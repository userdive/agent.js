/* @flow */
import events from 'events'
import eventObserver from 'ui-event-observer'

import { POINT } from './constants'
import type { Raven } from './types'

export default class Events {
  name: string
  logger: Raven
  handler: Function
  emitter: events.EventEmitter
  constructor (emitter: any, eventName: string, handler: Function, logger: Raven) {
    this.emitter = emitter
    this.handler = handler
    this.logger = logger
    this.name = eventName
  }
  change (data: {x: number, y: number}) {
    this.emitter.emit(POINT, data)
  }
  bind (global: any) {
    eventObserver.subscribe(global, this.name, () => {
      try {
        this.handler()
      } catch (err) {
        this.logger.captureException(err)
      }
    })
  }
  unbind () {
    eventObserver.unsubscribeAll()
  }
}
