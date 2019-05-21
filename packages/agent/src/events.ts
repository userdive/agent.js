import { EventEmitter } from 'events'

import * as objectAssign from 'object-assign'

import { getOffset, validate } from './browser'
import { LISTENER, SCROLL } from './constants'
import { CustomError, error, raise, warning } from './logger'
import { EventType, InteractionPoint } from './types'

export interface AgentEventBase<T> {
  on(eventName: EventType, handler: (e: T) => void): void
  off(): void
}

export interface AgentEvent extends AgentEventBase<UIEvent> {
  on(): void
}

export default class Events<T> implements AgentEventBase<T> {
  private observer: any
  private emitter: EventEmitter
  private name: string
  public constructor(
    emitName: string,
    eventEmitter: EventEmitter,
    eventObserver: any
  ) {
    this.name = emitName
    this.emitter = eventEmitter
    this.observer = eventObserver
  }
  public on(eventName: EventType, handler: (event: T) => void): void {
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
  }
  public off(): void {
    this.observer.unsubscribeAll()
  }
  protected error(err: CustomError): void {
    error(err)
  }
  protected warning(err: CustomError): void {
    warning(err)
  }
  protected validate(): boolean {
    raise('please override validate')
    return false
  }
  protected emit(data: InteractionPoint): void {
    if (data.x < 0 || data.y < 0) {
      return
    }

    const { left, top } = getOffset(window)

    this.emitter.emit(
      this.name,
      objectAssign({}, data, {
        left,
        top,
      })
    )
  }
}
