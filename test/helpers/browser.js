/* @flow */

export function isIE11 (): boolean {
  return !!window.MSInputMethodContext && !!document.documentMode
}

export function isTouchDevice (): boolean {
  return 'ontouchstart' in window
}
