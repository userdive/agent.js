/* @flow */
import events from 'events'
import eventObserver from 'ui-event-observer'

type EventType = 'click'

interface Logger {
  error(err: any): void
}

export const NAME = 'POINT'

export default class Events {
  emitter: events.EventEmitter
  logger: Logger
  constructor (emitter: events.EventEmitter, logger: any): void {
    this.emitter = emitter
    this.logger = logger
  }
  change (data: {x: number, y: number}): void {
    if (!data.x || !data.y) {
      this.unbind()
      return
    }
    this.emitter.emit(NAME, data)
  }
  bind (global: any, eventName: EventType, handler: MouseEventHandler): void {
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
