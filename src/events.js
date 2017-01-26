/* @flow */
import mitt from 'mitt'
import eventObserver from 'ui-event-observer'
import throttle from 'throttle-debounce/throttle'

import warning from './warning'
import type {
  Interact,
  InteractType
} from './types'

type EventType = 'click'

interface Logger {
  error(err: any): void
}

let emitter: mitt
let cache: Interact
let delay: number[]
let cachedDelayTime: number
let EMIT_NAME: string
let EVENT_NAME: EventType

type Handler = MouseEventHandler

function cacheValidator (data: Object): boolean {
  if (data.x > 0 && data.y > 0 &&
    data.type && data.time > 0 &&
    typeof data.left === 'number' && typeof data.top === 'number') {
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
      emitter.emit(EMIT_NAME, cache)
    }
  }, getDelayTime())
}

function getType (): InteractType | '' {
  switch (EVENT_NAME) {
    case 'click':
      return 'a'
  }
  return ''
}

export default class Events {
  logger: Logger
  constructor (emitName: string, eventEmitter: mitt, logger: Logger, delayTimes: number[]): void {
    EMIT_NAME = emitName
    emitter = eventEmitter
    delay = delayTimes
    this.logger = logger
  }
  validate (): boolean {
    warning('please override validate')
    return false
  }
  save (data: {x: number, y: number}): Interact | null {
    const type: string = getType()
    if (!type) {
      return null
    }

    const interact: Object = Object.assign({}, data, {
      type: type,
      left: window.scrollX,
      time: Date.now(),
      top: window.scrollY
    })
    if (cacheValidator(interact)) {
      cache = interact
    }
    return cache
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

    eventObserver.subscribe(global, EVENT_NAME, throttle(1000, e => {
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
