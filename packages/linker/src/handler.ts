import { LINKER } from '@userdive/agent/lib/constants'
import * as objectAssign from 'object-assign'
import { parse, stringify } from 'query-string'

const matchUrl = /^https?:\/\/([^\/:]+)/
export type DOMAIN = string | RegExp

export function linkHandler (
  domains: DOMAIN[],
  param: { [key: string]: string }
): EventListenerOrEventListenerObject {
  return (event: Event) => {
    const eventElement: any = event.target || event.srcElement
    scanLinkElement(param, domains, eventElement)
  }
}

export function submitHandler (
  domains: DOMAIN[],
  param: { [key: string]: string }
): EventListenerOrEventListenerObject {
  return (event: Event) => {
    const eventElement: any = event.target || event.srcElement
    if (addableForm(domains, eventElement)) {
      formLink(eventElement, param)
    }
  }
}

function scanLinkElement (
  param: { [key: string]: string },
  domains: DOMAIN[],
  node: any
) {
  for (let i = 100; node && i > 0; i++) {
    // TODO need area tag support?
    if (node instanceof HTMLAnchorElement && linkable(domains, node)) {
      node.href = linkUrl(node.href, param)
      return
    }
    node = node.parentNode
  }
}

function linkable (
  domains: DOMAIN[],
  { protocol, href }: HTMLAnchorElement
): boolean {
  const isHttp: boolean = protocol === 'http:' || protocol === 'https:'
  if (!href || !isHttp) {
    return false
  }
  return matchDomain(domains, href)
}

function addableForm (domains: DOMAIN[], element: any) {
  let match
  if (element instanceof HTMLFormElement && element.action) {
    match = element.action.match(matchUrl)
  }
  return match ? matchDomain(domains, match[1]) : false
}

function matchDomain (domains: DOMAIN[], test: string): boolean {
  if (test === document.location.hostname) {
    return false
  }

  return domains.some(
    (d: any) => (d instanceof RegExp && d.test(test)) || test.indexOf(d) >= 0
  )
}

function linkUrl (urlString: string, param: { [key: string]: string }): string {
  const url: string[] = urlString.split('?')
  const queryObj: object = url.length > 1 ? parse(url[1]) : {}
  const query: string = stringify(objectAssign({}, queryObj, param))
  return `${url[0]}?${query}`
}

function formLink (form: HTMLFormElement, param: { [key: string]: string }) {
  if (form.method.toLocaleLowerCase() === 'get') {
    addHiddenInput(form, param)
  } else if (form.method.toLocaleLowerCase() === 'post') {
    form.action = linkUrl(form.action, param)
  }
}

function addHiddenInput (
  form: HTMLFormElement,
  param: { [key: string]: string }
) {
  const value: string = param[LINKER]
  const nodes: any = form.childNodes

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].name === LINKER) {
      nodes[i].setAttribute('value', value)
      return
    }
  }
  const i: HTMLInputElement = document.createElement('input')
  i.setAttribute('type', 'hidden')
  i.setAttribute('name', LINKER)
  i.setAttribute('value', value)
  form.appendChild(i)
}
