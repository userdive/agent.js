export const isIE11 = (w: any, d: any): boolean =>
  !!w['MSInputMethodContext'] && !!d['documentMode']

export const isMouseDevice = (w: Window = window): boolean =>
  'onmousemove' in w

export const isPointerDevice = (w: Window = window): boolean =>
  'onpointermove' in w

export const isTouchDevice = (w: Window = window): boolean =>
  'ontouchstart' in w
