/* @flow */
import type {EventType} from '../../src/types'
import { isIE11 } from './browser'

export function createEvent (eventName: EventType): ?Event {
  let e
  if (typeof Event === 'function') {
    e = new Event(eventName)
  } else if (isIE11() && eventName === 'scroll') {
    // NotSupportedError
  } else {
    e = document.createEvent('Event')
    e.initEvent(eventName, true, true)
  }
  return e
}
