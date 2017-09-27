/* @flow */
import type { EventType, InteractType } from '../../src/types'

export function createEvent (eventName: EventType): ?Event {
  let e
  if (typeof Event === 'function') {
    e = new Event(eventName)
  } else {
    e = document.createEvent('Event')
    e.initEvent(eventName, true, true)
  }
  return e
}

export function getType (type: EventType): InteractType {
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
