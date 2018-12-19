import * as objectAssign from 'object-assign'

import { EventEmitter } from 'events'
import { UIEventObserver } from 'ui-event-observer'

import {
  checkSupportedFeatures,
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
  SCROLL_PROPERTIES,
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

function getFirstTouch (event: TouchEvent): Touch | null {
  return event.changedTouches ? event.changedTouches[0] : event.touches ? event.touches[0] : null
}

function getCenterPotision (w: Window): InteractionPosition {
  const { left, top } = getOffset(w)
  return { x: left + w.innerWidth / 2, y: top + w.innerHeight / 2 }
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
    'mouseup': (event: Event) => (this.handleMouseUp(event as MouseEvent)),
    'mousewheel': (event: Event) => (this.handleMouseWheel(event as WheelEvent))
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
  private scrollEventHandlerMap: { [eventName: string]: (event: Event) => void } = {
    'scroll': (event: Event) => (this.handleScroll(event as UIEvent))
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

  public bind (target: EventTarget) {
    if (!this.bound) {
      if (checkSupportedFeatures(target, CLICK_EVENTS)) {
        for (const eventName in this.clickEventHandlerMap) {
          if (this.clickEventHandlerMap.hasOwnProperty(eventName)) {
            this.bindTarget(target, eventName, this.clickEventHandlerMap[eventName])
          }
        }
      }
      if (checkSupportedFeatures(target, MOUSE_EVENTS)) {
        for (const eventName in this.mouseEventHandlerMap) {
          if (this.mouseEventHandlerMap.hasOwnProperty(eventName)) {
            this.bindTarget(target, eventName, this.mouseEventHandlerMap[eventName])
          }
        }
      }
      if (checkSupportedFeatures(target, POINTER_EVENTS)) {
        for (const eventName in this.pointerEventHandlerMap) {
          if (this.pointerEventHandlerMap.hasOwnProperty(eventName)) {
            this.bindTarget(target, eventName, this.pointerEventHandlerMap[eventName])
          }
        }
      }
      if (checkSupportedFeatures(target, TOUCH_EVENTS)) {
        for (const eventName in this.touchEventHandlerMap) {
          if (this.touchEventHandlerMap.hasOwnProperty(eventName)) {
            this.bindTarget(target, eventName, this.touchEventHandlerMap[eventName])
          }
        }
        if (checkSupportedFeatures(window, SCROLL_PROPERTIES)) {
          for (const eventName in this.scrollEventHandlerMap) {
            if (this.scrollEventHandlerMap.hasOwnProperty(eventName)) {
              console.log('bind', eventName, this.scrollEventHandlerMap[eventName])
              this.bindTarget(window, eventName, this.scrollEventHandlerMap[eventName])
            }
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

  protected bindTarget (
    target: EventTarget,
    eventName: string,
    handler: (event: Event) => void
  ) {
    this.observer.subscribe(target, eventName, (event: Event) => {
      try {
        console.log('handle', eventName, event)
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
    if (position.x && position.y && position.x >= 0 && position.y >= 0) {
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

  protected handleMouseDown (event: MouseEvent): void {
    this.mouseMoved = false
    const mouseDownElement = getTargetElementFromEvent(event)
    if (mouseDownElement) {
      this.mouseDownElement = mouseDownElement
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

  protected handleMouseMove (event: MouseEvent) {
    this.mouseMoved = true
    this.mouseDownElement = undefined
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    this.updateLatestPosition(
      INTERACTION_TYPE_LOOK,
      {
        y: event.pageY,
        x: event.pageX
      }
    )
  }

  protected handleMouseUp (event: MouseEvent) {
    const targetElement = getTargetElementFromEvent(event)
    if (
      targetElement !== undefined &&
      this.mouseDownElement === targetElement &&
      !this.mouseMoved
    ) {
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

  protected handleMouseWheel (event: WheelEvent) {
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    this.updateLatestPosition(
      INTERACTION_TYPE_LOOK,
      {
        y: event.pageY,
        x: event.pageX
      }
    )
  }

  protected handlePointerDown (event: PointerEvent): void {
    this.pointerMoved = false
    const pointerDownElement = getTargetElementFromEvent(event)
    if (pointerDownElement) {
      this.pointerDownElement = pointerDownElement
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

  protected handlePointerMove (event: PointerEvent) {
    this.pointerMoved = true
    this.pointerDownElement = undefined
    // https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
    this.updateLatestPosition(
      INTERACTION_TYPE_LOOK,
      {
        y: event.pageY,
        x: event.pageX
      }
    )
  }

  protected handlePointerUp (event: PointerEvent) {
    const targetElement = getTargetElementFromEvent(event)
    if (
      targetElement !== undefined &&
      this.pointerDownElement === targetElement &&
      !this.pointerMoved
    ) {
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

  protected handleTouchStart (event: TouchEvent): void {
    this.touchMoved = false
    const touchStartElement = getTargetElementFromEvent(event)
    if (touchStartElement) {
      const touch = getFirstTouch(event)
      if (touch) {
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

  protected handleTouchMove (event: TouchEvent) {
    this.touchMoved = true
    this.touchStartElement = undefined
    const touch = getFirstTouch(event)
    if (touch) {
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

  protected handleTouchEnd (event: TouchEvent) {
    const targetElement = getTargetElementFromEvent(event)
    if (
      targetElement !== undefined &&
      this.touchStartElement === targetElement &&
      !this.touchMoved
    ) {
      const touch = getFirstTouch(event)
      if (touch) {
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

  protected handleScroll (event: UIEvent) {
    console.log('handleScroll', event, event.target)
    if (event.target) {
      const centerPosition = getCenterPotision(window)
      if (centerPosition.y > 0 && centerPosition.x > 0) {
        this.updateLatestPosition(INTERACTION_TYPE_LOOK, centerPosition)
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
