/* @flow */
import events from 'events'
import eventObserver from 'ui-event-observer'

import { POINT } from './constants'

export default class Events {
  logger: any // TODO type
  emitter: events.EventEmitter
  constructor (emitter: any, logger: any) {
    this.emitter = emitter
    this.logger = logger
  }
  change (data: {x: number, y: number}) {
    this.emitter.emit(POINT, data)
  }
  bind (global: any, eventName: string, handler: (e: MouseEvent) => void): void {
    if (!global || !handler) {
      throw new Error('please override bind')
    }

    eventObserver.subscribe(global, eventName, e => {
      try {
        handler(e)
      } catch (err) {
        this.logger.error(err)
      }
    })
  }
  unbind () {
    eventObserver.unsubscribeAll()
  }
}
