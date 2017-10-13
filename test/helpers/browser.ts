export function isIE11 (): boolean {
  return 'MSInputMethodContext' in window && 'documentMode' in document
}

export function isTouchDevice (): boolean {
  return 'ontouchstart' in window
}
