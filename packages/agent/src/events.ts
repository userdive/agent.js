import * as objectAssign from 'object-assign'

import { EventEmitter } from 'events'
import { getOffset, validate } from './browser'
import { LISTENER, SCROLL } from './constants'
import { CustomError, error, raise, warning } from './logger'
import { EventType, InteractType, Point } from './types'

export interface AgentEventBase {
  on (
    eventName: EventType,
    handler: (e: Event) => void,
    type: InteractType
  ): void
  off (): void
}

export interface AgentEvent extends AgentEventBase {
  on (): void
}

export default class Events implements AgentEventBase {
  private observer: any
  private emitter: EventEmitter
  private name: string
  private type: InteractType
  constructor (
    emitName: string,
    eventEmitter: EventEmitter,
    eventObserver: any
  ) {
    this.name = emitName
    this.emitter = eventEmitter
    this.observer = eventObserver
  }
  on (
    eventName: EventType,
    handler: (event: any /* FIXME Event type */) => void,
    type: InteractType
  ): void {
    if (typeof handler !== 'function' || !(type === 'a' || type === 'l')) {
      return raise('please override on')
    }

    if (!this.validate() || !validate(LISTENER.concat(SCROLL))) {
      return
    }

    this.observer.subscribe(window, eventName, (e: any) => {
      try {
        handler(e)
      } catch (err) {
        error(err)
      }
    })
    this.type = type
  }
  off (): void {
    this.observer.unsubscribeAll()
  }
  protected error (err: CustomError): void {
    error(err)
  }
  protected warning (err: CustomError): void {
    warning(err)
  }
  protected validate (): boolean {
    raise('please override validate')
    return false
  }
  protected emit (data: Point): void {
    if (data.x < 0 || data.y < 0 || !this.type) {
      return
    }

    const { x, y } = getOffset(window)

    this.emitter.emit(
      this.name,
      objectAssign({}, data, {
        type: this.type,
        left: x,
        top: y
      })
    )
  }
}
