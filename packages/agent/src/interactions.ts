import * as objectAssign from 'object-assign'

import { EventEmitter } from 'events'
import { UIEventObserver } from 'ui-event-observer'

import {
  checkSupportedEvents,
  getOffset
} from './browser'
import {
  CLICK_EVENTS,
  INTERACTION_EMIT_INTERVAL,
  INTERACTION_TYPE_ACTION,
  INTERACTION_TYPE_LOOK,
  MAX_INTERACTION_SEQUENCE,
  MOUSE_EVENTS,
  POINTER_EVENTS,
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

  // For click events
  private clickEventHandlerMap: { [eventName: string]: (event: Event) => void } = {
    'click': (event: Event) => (this.handleClick(event as MouseEvent))
  }

  // For mouse events
  private mouseDownElement?: EventTarget
  private mouseMoved: boolean
  private mouseEventHandlerMap: { [eventName: string]: (event: Event) => void } = {
    'mousedown': (event: Event) => (this.handleMouseDown(event as MouseEvent)),
    'mousemove': (event: Event) => (this.handleMouseMove(event as MouseEvent)),
    'mouseup': (event: Event) => (this.handleMouseUp(event as MouseEvent))
  }

  // For pointer events
  private pointerDownElement?: EventTarget
  private pointerMoved: boolean
  private pointerEventHandlerMap: { [eventName: string]: (event: Event) => void } = {
    'pointerdown': (event: Event) => (this.handlePointerDown(event as PointerEvent)),
    'pointermove': (event: Event) => (this.handlePointerMove(event as PointerEvent)),
    'pointerup': (event: Event) => (this.handlePointerUp(event as PointerEvent))
  }

  // For touch events
  private touchStartElement?: EventTarget
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

  public bind (target: Window | Document) {
    if (!this.bound) {
      if (checkSupportedEvents(target, CLICK_EVENTS)) {
        for (const eventName in this.clickEventHandlerMap) {
          if (this.clickEventHandlerMap.hasOwnProperty(eventName)) {
            this.handle(target, eventName, this.clickEventHandlerMap[eventName])
          }
        }
      }
      if (checkSupportedEvents(target, MOUSE_EVENTS)) {
        for (const eventName in this.mouseEventHandlerMap) {
          if (this.mouseEventHandlerMap.hasOwnProperty(eventName)) {
            this.handle(target, eventName, this.mouseEventHandlerMap[eventName])
          }
        }
      }
      if (checkSupportedEvents(target, POINTER_EVENTS)) {
        for (const eventName in this.pointerEventHandlerMap) {
          if (this.pointerEventHandlerMap.hasOwnProperty(eventName)) {
            this.handle(target, eventName, this.pointerEventHandlerMap[eventName])
          }
        }
      }
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
    target: Window | Document,
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

  protected handleClick (event: MouseEvent) {
    if (event.pageX && event.pageY) {
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
      this.updateLatestPosition(
        INTERACTION_TYPE_LOOK,
        {
          y: event.pageY,
          x: event.pageX
        }
      )
      this.updateLatestPosition(
        INTERACTION_TYPE_ACTION,
        {
          y: event.pageY,
          x: event.pageX
        }
      )
    }
  }

  protected handleMouseDown (event: MouseEvent): void {
    this.mouseMoved = false
    if (event !== undefined) {
      const mouseDownElement = getTargetElementFromEvent(event)
      if (mouseDownElement) {
        this.mouseDownElement = mouseDownElement
        if (event.pageX && event.pageY) {
          // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
          this.updateLatestPosition(
            INTERACTION_TYPE_LOOK,
            {
              y: event.pageY,
              x: event.pageX
            }
          )
        }
      }
    }
  }

  protected handleMouseMove (event: MouseEvent) {
    this.mouseMoved = true
    this.mouseDownElement = undefined
    if (event !== undefined && event.pageX && event.pageY) {
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
      this.updateLatestPosition(
        INTERACTION_TYPE_LOOK,
        {
          y: event.pageY,
          x: event.pageX
        }
      )
    }
  }

  protected handleMouseUp (event: MouseEvent) {
    const targetElement = getTargetElementFromEvent(event)
    if (
      targetElement !== undefined &&
      this.mouseDownElement === targetElement &&
      !this.mouseMoved
    ) {
      if (event.pageX && event.pageY) {
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
        this.updateLatestPosition(
          INTERACTION_TYPE_ACTION,
          {
            y: event.pageY,
            x: event.pageX
          }
        )
      }
    }
  }

  protected handlePointerDown (event: PointerEvent): void {
    this.pointerMoved = false
    if (event !== undefined) {
      const pointerDownElement = getTargetElementFromEvent(event)
      if (pointerDownElement) {
        this.pointerDownElement = pointerDownElement
        if (event.pageX && event.pageY) {
          // https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
          this.updateLatestPosition(
            INTERACTION_TYPE_LOOK,
            {
              y: event.pageY,
              x: event.pageX
            }
          )
        }
      }
    }
  }

  protected handlePointerMove (event: PointerEvent) {
    this.pointerMoved = true
    this.pointerDownElement = undefined
    if (event !== undefined && event.pageX && event.pageY) {
      // https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
      this.updateLatestPosition(
        INTERACTION_TYPE_LOOK,
        {
          y: event.pageY,
          x: event.pageX
        }
      )
    }
  }

  protected handlePointerUp (event: PointerEvent) {
    const targetElement = getTargetElementFromEvent(event)
    if (
      targetElement !== undefined &&
      this.pointerDownElement === targetElement &&
      !this.pointerMoved
    ) {
      if (event.pageX && event.pageY) {
        // https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
        this.updateLatestPosition(
          INTERACTION_TYPE_ACTION,
          {
            y: event.pageY,
            x: event.pageX
          }
        )
      }
    }
  }

  protected handleTouchStart (event: TouchEvent): void {
    this.touchMoved = false
    if (event !== undefined) {
      const touchStartElement = getTargetElementFromEvent(event)
      if (touchStartElement) {
        const touch = getFirstTouch(event)
        if (touch && touch.pageX && touch.pageY) {
          // https://developer.mozilla.org/en-US/docs/Web/API/Touch
          this.touchStartElement = touchStartElement
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
    this.touchStartElement = undefined
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
      this.touchStartElement === targetElement &&
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
