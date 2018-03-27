export const isIE11 = (w: Window, document: Document): boolean =>
  !!w['MSInputMethodContext'] && !!d['documentMode']

export const isTouchDevice = (w: Window): boolean => 'ontouchstart' in w
