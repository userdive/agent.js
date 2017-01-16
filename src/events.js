/* @flow */
import events from 'events'
import eventObserver from 'ui-event-observer'

type EventType = 'click'

interface Logger {
  error(err: any): void
}

export default class Events {
  name: string
  emitter: events.EventEmitter
  logger: Logger
  constructor (emitter: any, logger: any) {
    this.emitter = emitter
    this.logger = logger
    this.name = 'POINT'
  }
  change (data: {x: number, y: number}) {
    this.emitter.emit(this.name, data)
  }
  bind (global: any, eventName: EventType, handler: (e: MouseEvent) => void): void {
    if (!global || !handler) {
      throw new Error('please override bind')
    }

    eventObserver.subscribe(global, eventName, () => {
      try {
        handler.apply(this, arguments)
      } catch (err) {
        this.logger.error(err)
      }
    })
  }
  unbind () {
    eventObserver.unsubscribeAll()
  }
}
