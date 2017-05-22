/* @flow */
import type {EventType} from '../../src/types'

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
