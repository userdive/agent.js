export const isIE11 = (w: any, d: any): boolean =>
  !!w['MSInputMethodContext'] && !!d['documentMode']

export const isTouchDevice = (w: Window = window): boolean =>
  'ontouchstart' in w

export const isMouseMoveDevice = (w: Window = window): boolean =>
  'onmousemove' in w
