/* @flow */

export function isIE11 (): boolean {
  return !!window.MSInputMethodContext && !!document.documentMode
}
