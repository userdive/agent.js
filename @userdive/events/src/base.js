/* @flow */
import mitt from 'mitt'
import eventObserver from 'ui-event-observer'
import throttle from 'throttle-debounce/throttle'

type EventType = 'click'

interface Logger {
  error(err: any): void
}

export const NAME = 'POINT'

let emitter, cache, delay, cachedDelayTime

type Handler = MouseEventHandler

function cacheValidator ({x, y}: {x: number, y: number}): boolean {
  if (x > 0 && y > 0) {
    return true
  }
  return false
}

function getDelayTime (): number {
  if (delay.length === 0) {
    return cachedDelayTime
  }
  cachedDelayTime = delay.shift()
  return cachedDelayTime
}

function reduce (): void {
  setTimeout(() => {
    if (cacheValidator(cache)) {
      emitter.emit(NAME, cache)
    }
  }, getDelayTime())
}

export default class Events {
  logger: Logger
  constructor (eventEmitter: mitt, logger: Logger, delayTimes: number[]): void {
    emitter = eventEmitter
    delay = delayTimes
    this.logger = logger
  }
  validate (): boolean {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('please override validate')
    }
    return false
  }
  save (data: {x: number, y: number}): {x: number, y: number } {
    if (cacheValidator(data)) {
      cache = data
    }
    return cache
  }
  bind (global: Document | window, eventName: EventType, handler: Handler): void {
    if (!global || !handler) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('please override bind')
      }
      return
    }

    if (!this.validate()) {
      return
    }

    eventObserver.subscribe(global, eventName, throttle(1000, e => {
      try {
        handler(e)
      } catch (err) {
        this.logger.error(err)
      }
    }))
    reduce()
  }
  unbind (): void {
    eventObserver.unsubscribeAll()
  }
}
