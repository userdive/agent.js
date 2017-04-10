/* @flow */
import { NAMESPACE } from '../../src/constants'
import { random } from 'faker'

export function inject (GLOBAL_NAME: string) {
  const id = random.word()

  const script = document.createElement('script')
  script.id = id

  function append (body: any, element: HTMLElement) {
    body.appendChild(element)
  }
  append(document.body, script)

  function set (element: any) {
    element.setAttribute(NAMESPACE, GLOBAL_NAME)
  }
  set(document.getElementById(id))
}

export function createEntry (global: window, name: string) {
  global[name] = global[name] || function () {
    (global[name].q = global[name].q || []).push(arguments)
  }
  return global[name]
}
