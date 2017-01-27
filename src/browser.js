/* @flow */

export function validate (apis: string[], target: HTMLElement | window): boolean {
  for (let i = 0; i < apis.length; i++) {
    if (!(apis[i] in target)) {
      return false
    }
  }
  return true
}
