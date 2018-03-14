/*! userdive | Copyright (c) UNCOVER TRUTH Inc. */

const TAG_NAME = 'script'

export interface IAttributes {
  [key: string]: any
}

export function inject (source: string, attributes: IAttributes) {
  const element: any = document.createElement(TAG_NAME)
  const script: any = document.getElementsByTagName(TAG_NAME)[0]
  element.async = 1
  element.defer = 1
  element.src = source
  element.charset = 'UTF-8'
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key])
  })
  script.parentNode.insertBefore(element, script)
}

export function q (name: string, global: any) {
  global[name] =
    global[name] ||
    function () {
      (global[name].q = global[name].q || []).push(arguments)
    }
  return global[name]
}

export const namespace = 'data-ud-namespace'

export default function (
  name?: string,
  source?: string,
  global?: any
): Function {
  name = name || '_ud'
  source = source || 'https://cdn.userdive.com/agent.js'
  global = global || window
  if (global[name]) {
    return global[name]
  }
  inject(source, { [namespace]: name })
  return q(name, global)
}
