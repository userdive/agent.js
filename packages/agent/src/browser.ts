import { VERSION } from './constants'
import { error } from './logger'
import { ClientEnvironmentsData, Size } from './types'

const getWindowSize = (w: {
  innerHeight: number
  innerWidth: number
}): Size => ({
  h: w.innerHeight,
  w: w.innerWidth
})

function getResourceSize (d: Document): Size {
  const body = d.body as HTMLElement
  return {
    h: body.clientHeight,
    w: body.clientWidth
  }
}

const getScreenSize = (s: { height: number; width: number }): Size => ({
  h: s.height,
  w: s.width
})

export const getOffset = (w: Window) => ({
  x: w.scrollX || w.pageXOffset,
  y: w.scrollY || w.pageYOffset
})

export const getEnv = (page: string): ClientEnvironmentsData | void => {
  try {
    const d = document
    const screenSize = getScreenSize(screen)
    const windowSize = getWindowSize(window)
    const resourceSize = getResourceSize(d)
    return {
      v: VERSION,
      r: d.referrer,
      n: d.title,
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

export const validate = (apis: string[]): boolean =>
  !apis.some((api: string) => !(api in window))
