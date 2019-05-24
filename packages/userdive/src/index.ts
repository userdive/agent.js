/*! userdive | Copyright (c) UNCOVER TRUTH Inc. */
import { USERDIVEApi } from './types'

const TAG_NAME = 'script'
export function inject(source: string, attributes: { [key: string]: string }) {
  const element = document.createElement(TAG_NAME) as HTMLScriptElement
  const script: any = document.getElementsByTagName(TAG_NAME)[0]
  element.async = true
  element.defer = true
  element.src = source
  element.charset = 'UTF-8'
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key])
  })
  script.parentNode.insertBefore(element, script)
}

export function q(name: string, global: any): USERDIVEApi {
  global[name] =
    global[name] ||
    function() {
      ;(global[name].q = global[name].q || []).push(arguments)
    }
  return global[name]
}

export const namespace = 'data-ud-namespace'

let name: string
let source: string

export default function(
  overrideName?: string,
  overrideSource?: string,
  global?: any
): USERDIVEApi {
  name = name || (overrideName || '_ud')
  source = source || (overrideSource || 'https://cdn.userdive.com/agent.js')
  global = global || window
  if (global[name]) {
    return global[name]
  }
  inject(source, { [namespace]: name })
  return q(name, global)
}
