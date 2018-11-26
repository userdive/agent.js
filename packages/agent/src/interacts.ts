import * as objectAssign from 'object-assign'

import { EventEmitter } from 'events'
import {
  INTERACT_TYPE_ACTION,
  INTERACT_TYPE_LOOK,
  INTERVAL as INTERACT_INTERVALS,
  MAX_INTERACT_SEQ
} from './constants'
import {
  Interact,
  InteractType
} from './types'

export default class InteractEvent {
  private bound: boolean
  private emitter: EventEmitter
  private latestLook: Interact | {}
  private latestAction: Interact | {}
  private sequentialNumber: number
  private intervals: number[]

  constructor () {
    this.emitter = new EventEmitter()
    this.bound = false
    this.initialize()
  }

  public initialize (): void {
    // Call for each page views
    this.latestLook = {}
    this.latestAction = {}
    this.sequentialNumber = 0
    this.intervals = INTERACT_INTERVALS.concat()
  }

  public bind () {
    if (!this.bound) {
      // TODO Bind DOM events
      this.bound = true
      this.emit()
    }
  }

  public unbind () {
    if (this.bound) {
      // TODO Unbind DOM events
      this.bound = false
    }
  }

  protected emitByInteractType (interactType: InteractType) {
    this.emitter.emit(
      interactType,
      objectAssign({}, {
        id: this.sequentialNumber
          // TODO Emit latest look data
      })
    )
  }

  protected emit () {
    if (this.sequentialNumber > MAX_INTERACT_SEQ) {
      this.emitByInteractType(INTERACT_TYPE_LOOK)
      if (this.latestAction) {
        this.emitByInteractType(INTERACT_TYPE_ACTION)
        // Reset cached action
        this.latestAction = {}
      }
    }
    this.sequentialNumber++

    if (this.bound) {
      const delayMilliseconds = this.intervals.shift()

      if (delayMilliseconds !== undefined && delayMilliseconds >= 0) {
        setTimeout(this.emit.bind(this), delayMilliseconds * 1000)
      }
    }
  }
}
