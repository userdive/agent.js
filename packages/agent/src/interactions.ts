import * as objectAssign from 'object-assign'

import { EventEmitter } from 'events'
import { UIEventObserver } from 'ui-event-observer'

import {
  checkSupportedEvents,
  getOffset
} from './browser'
import {
  INTERACTION_EMIT_INTERVAL,
  INTERACTION_TYPE_ACTION,
  INTERACTION_TYPE_LOOK,
  MAX_INTERACTION_SEQUENCE,
  TOUCH_EVENTS
} from './constants'
import {
  InteractionData,
  InteractionPosition,
  InteractionType
} from './types'

function getTargetElementFromEvent (event: Event): EventTarget | null {
  return event.target || event.srcElement
}

function getFirstTouch (event: TouchEvent): Touch {
  return event.changedTouches ? event.changedTouches[0] : event.touches[0]
}

class InteractionEventEmitter extends EventEmitter {
  private bound: boolean

  private observer: UIEventObserver
  private sequentialNumber: number
  private latestLookPosition?: InteractionData
  private latestActionPosition?: InteractionData

  // For touch events
  private touchedElement?: EventTarget
  private touchMoved: boolean
  private touchEventHandlerMap: { [eventName: string]: (event: Event) => void } = {
    'touchstart': (event: Event) => (this.handleTouchStart(event as TouchEvent)),
    'touchmove': (event: Event) => (this.handleTouchMove(event as TouchEvent)),
    'touchend': (event: Event) => (this.handleTouchEnd(event as TouchEvent))
  }

  constructor () {
    super()
    this.bound = false
    this.observer = new UIEventObserver() // singleton
    this.init()
  }

  public init (): void {
    // Call for each page views
    this.latestLookPosition = undefined
    this.latestActionPosition = undefined
    this.sequentialNumber = 0
  }

  public bind (target: Window | HTMLElement) {
    if (!this.bound) {
      if (checkSupportedEvents(target, TOUCH_EVENTS)) {
        for (const eventName in this.touchEventHandlerMap) {
          if (this.touchEventHandlerMap.hasOwnProperty(eventName)) {
            this.handle(target, eventName, this.touchEventHandlerMap[eventName])
          }
        }
      }
      this.bound = true
      this.emitInteraction()
    }
  }

  public unbind () {
    if (this.bound) {
      this.observer.unsubscribeAll()
      this.bound = false
    }
  }

  protected handle (
    target: Window | HTMLElement,
    eventName: string,
    handler: (event: Event) => void
  ) {
    this.observer.subscribe(target, eventName, (event: Event) => {
      try {
        if (event !== undefined) {
          handler(event)
        }
      } catch (error) {
        throw error // TODO Log error
      }
    })
  }

  protected updateLatestPosition (
    interactionType: InteractionType,
    position: InteractionPosition
  ) {
    if (position.x >= 0 && position.y >= 0) {
      const { left, top } = getOffset(window)
      const eventPosition = {
        left,
        top,
        y: position.y,
        x: position.x
      }
      if (interactionType === INTERACTION_TYPE_ACTION) {
        this.latestActionPosition = eventPosition
      } else if (interactionType === INTERACTION_TYPE_LOOK) {
        this.latestLookPosition = eventPosition
      }
    }
  }

  protected handleTouchStart (event: TouchEvent): void {
    this.touchMoved = false
    if (event !== undefined) {
      const touchedElement = getTargetElementFromEvent(event)
      if (touchedElement) {
        const touch = getFirstTouch(event)
        if (touch && touch.pageX && touch.pageY) {
          // https://developer.mozilla.org/en-US/docs/Web/API/Touch
          this.touchedElement = touchedElement
          this.updateLatestPosition(
            INTERACTION_TYPE_LOOK,
            {
              y: touch.pageY,
              x: touch.pageX
            }
          )
        }
      }
    }
  }

  protected handleTouchMove (event: TouchEvent) {
    this.touchMoved = true
    this.touchedElement = undefined
    if (event !== undefined) {
      const touch = getFirstTouch(event)
      if (touch && touch.pageX && touch.pageY) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Touch
        this.updateLatestPosition(
          INTERACTION_TYPE_LOOK,
          {
            y: touch.pageY,
            x: touch.pageX
          }
        )
      }
    }
  }

  protected handleTouchEnd (event: TouchEvent) {
    const targetElement = getTargetElementFromEvent(event)
    if (
      targetElement !== undefined &&
      this.touchedElement === targetElement &&
      !this.touchMoved
    ) {
      const touch = getFirstTouch(event)
      if (touch && touch.pageX && touch.pageY) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Touch
        this.updateLatestPosition(
          INTERACTION_TYPE_ACTION,
          {
            y: touch.pageY,
            x: touch.pageX
          }
        )
      }
    }
  }

  protected emitInteractionByType (
    interactionType: InteractionType,
    interactionData?: InteractionData
  ) {
    if (interactionData !== undefined) {
      this.emit(
        interactionType,
        objectAssign({}, interactionData, {
          id: this.sequentialNumber,
          type: interactionType
        })
      )
    }
  }

  protected emitInteraction () {
    if (this.bound) {
      if (this.sequentialNumber <= MAX_INTERACTION_SEQUENCE) {
        this.emitInteractionByType(INTERACTION_TYPE_LOOK, this.latestLookPosition)
        this.emitInteractionByType(INTERACTION_TYPE_ACTION, this.latestActionPosition)
        this.latestActionPosition = undefined
      }
      this.sequentialNumber++

      setTimeout(this.emitInteraction.bind(this), INTERACTION_EMIT_INTERVAL)
    }
  }
}
export default InteractionEventEmitter
