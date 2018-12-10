import * as objectAssign from 'object-assign'

import { EventType, InteractionType } from '../../src/types'

export function createEvent (eventName: EventType): Event {
  let e
  if (typeof Event === 'function') {
    e = new Event(eventName)
  } else {
    e = document.createEvent('Event')
    e.initEvent(eventName, true, true)
  }
  return e
}

interface SupportDeprecatedTouchEvent extends TouchEvent {
  touches: TouchList
}

export function createMouseEvent (
  eventName: EventType,
  screenY: number,
  screenX: number,
  clientY: number,
  clientX: number
): MouseEvent {
  if ('MouseEvent' in window && MouseEvent.length > 0) {
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    return new MouseEvent(
      eventName, {
        bubbles: false,
        cancelable: true,
        screenY,
        screenX,
        clientY,
        clientX
      }
    )
  }
  const mouseEvent = document.createEvent('MouseEvent')
  // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
  mouseEvent.initMouseEvent(
    eventName,
    false,
    true,
    window,
    0,
    screenX,
    screenY,
    clientX,
    clientY,
    false,
    false,
    false,
    false,
    0,
    null
  )
  return mouseEvent
}

export function createPointerEvent (
  eventName: EventType,
  screenY: number,
  screenX: number,
  clientY: number,
  clientX: number
): PointerEvent {
  // https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
  return new PointerEvent(
    eventName, {
      bubbles: false,
      cancelable: true,
      screenY,
      screenX,
      clientY,
      clientX
    }
  )
}

export function createTouchEvent (
  eventName: EventType,
  target: EventTarget,
  touchData: Array<{ identifier: number, pageY: number, pageX: number }>
): TouchEvent {
  // https://developers.google.com/web/updates/2016/09/chrome-54-deprecations#use_of_inittouchevent_is_removed
  if ('TouchEvent' in window && TouchEvent.length > 0) {
    // https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
    return new TouchEvent(
      eventName,
      {
        touches: touchData.map((touch) =>
          new Touch(objectAssign(touch, { target })))
      }
    )
  }
  const touchEvent = document.createEvent('TouchEvent') as SupportDeprecatedTouchEvent
  // https://developer.mozilla.org/ja/docs/Web/API/Document/createEvent
  touchEvent.initUIEvent(eventName, true, true, window, 1)
  touchEvent.touches = document.createTouchList(
    ...touchData.map(({ identifier, pageX, pageY }) =>
      document.createTouch(window, target, identifier, pageX, pageY, 0, 0)
    )
  )
  return touchEvent
}

export function getType (type: EventType): InteractionType {
  switch (type) {
    case 'click':
    case 'touchend':
      return 'a'
    case 'scroll':
    case 'mousemove':
      return 'l'
  }
  return 'a'
}
