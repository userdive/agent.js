/* @flow */
import type { Size } from './types'

export function getWindowSize (w: {innerHeight: number, innerWidth: number}): Size {
  return {
    h: w.innerHeight,
    w: w.innerWidth
  }
}

export function getResourceSize (d: Document): Size {
  const body: any = d.body
  return {
    h: body.clientHeight,
    w: body.clientWidth
  }
}

export function getScreenSize (s: {height: number, width: number}): Size {
  return {
    h: s.height,
    w: s.width
  }
}

export function validate (apis: string[], target: ?HTMLElement): boolean {
  target = target || window
  for (let i = 0; i < apis.length; i++) {
    if (!(apis[i] in target)) {
      return false
    }
  }
  return true
}
