import { VERSION } from './constants'
import { error } from './logger'
import { ClientEnvironmentsData, Size } from './types'

function getWindowSize (w: { innerHeight: number; innerWidth: number }): Size {
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

function getScreenSize (s: { height: number; width: number }): Size {
  return {
    h: s.height,
    w: s.width
  }
}

export function getOffset (w: Window) {
  return {
    x: w.scrollX || w.pageXOffset,
    y: w.scrollY || w.pageYOffset
  }
}

function getReferrer (): string {
  return document.referrer
}

function getTitle () {
  return document.title
}

export function getEnv (page: string): ClientEnvironmentsData | void {
  try {
    const screenSize = getScreenSize(screen)
    const windowSize = getWindowSize(window)
    const resourceSize = getResourceSize(document)
    return {
      v: VERSION,
      r: getReferrer(),
      n: getTitle(),
      l: page,
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

export function validate (apis: string[]): boolean {
  for (let i = 0; i < apis.length; i++) {
    if (!(apis[i] in window)) {
      return false
    }
  }
  return true
}
