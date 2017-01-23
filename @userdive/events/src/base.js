/* @flow */
import mitt from 'mitt'
import eventObserver from 'ui-event-observer'

type EventType = 'click'

interface Logger {
  error(err: any): void
}

export const NAME = 'POINT'

export default class Events {
  data: any // TODO type
  emitter: mitt
  logger: Logger
  constructor (emitter: mitt, logger: any): void {
    this.emitter = emitter
    this.logger = logger
  }
  change (data: {x: number, y: number}): void {
    this.emitter.emit(NAME, data)
  }
  save (data: {x: number, y: number}) {
    this.data = data
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
