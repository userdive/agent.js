/* @flow */
import { VERSION } from './constants'
import type { Size, ClientEnvironmentsData } from './types'
import { error } from './logger'

function getWindowSize (w: {innerHeight: number, innerWidth: number}): Size {
  return {
    h: w.innerHeight,
    w: w.innerWidth
  }
}

function getResourceSize (d: Document): Size {
  const body: any = d.body
  return {
    h: body.clientHeight,
    w: body.clientWidth
  }
}

function getScreenSize (s: {height: number, width: number}): Size {
  return {
    h: s.height,
    w: s.width
  }
}

export function getEnv (): ?ClientEnvironmentsData {
  try {
    const screenSize = getScreenSize(screen)
    const windowSize = getWindowSize(window)
    const resourceSize = getResourceSize(document)
    return {
      v: VERSION,
      sh: screenSize.h,
      sw: screenSize.w,
      wh: windowSize.h,
      ww: windowSize.w,
      h: resourceSize.h,
      w: resourceSize.w
    }
  } catch (err) {
    error(err)
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
