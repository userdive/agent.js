import * as objectAssign from 'object-assign'
import { parse, stringify } from 'query-string'

const queryKey = '_ud' // TODO
const matchUrl = /^https?:\/\/([^\/:]+)/

export function linkHandler (
  domains: any[],
  param: { [key: string]: string }
): EventListenerOrEventListenerObject {
  return (event: Event) => {
    const eventElement: any = event.target || event.srcElement
    scanLinkElement(param, domains, eventElement)
  }
}

export function submitHandler (
  domains: any[],
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
  domains: any[],
  node: any
) {
  for (let i = 100; node && 0 < i; i++) {
    // TODO need area tag support?
    if (node instanceof HTMLAnchorElement && linkable(domains, node)) {
      node.href = linkUrl(node.href, param)
      return
    }
    node = node.parentNode
  }
}

function linkable (domains: any[], linkElement: HTMLAnchorElement): boolean {
  const protocol: boolean =
    linkElement.protocol === 'http:' || linkElement.protocol === 'https:'
  if (!linkElement.href || !protocol) {
    return false
  }
  const to = linkElement.href
  return matchDomain(domains, to)
}

function addableForm (domains: any[], element: any) {
  let match
  if (element instanceof HTMLFormElement && element.action) {
    match = element.action.match(matchUrl)
  }
  return match ? matchDomain(domains, match[1]) : false
}

function matchDomain (domains: any[], test: string): boolean {
  if (test === document.location.hostname) {
    return false
  }
  for (let i = 0; i < domains.length; i++) {
    if (domains[i] instanceof RegExp) {
      if (domains[i].test(test)) return true
    } else if (0 <= test.indexOf(domains[i])) {
      return true
    }
  }
  return false
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
  const value: string = param[queryKey]
  const nodes: any = form.childNodes

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].name === queryKey) {
      nodes[i].setAttribute('value', value)
      return
    }
  }
  const i: HTMLInputElement = document.createElement('input')
  i.setAttribute('type', 'hidden')
  i.setAttribute('name', queryKey)
  i.setAttribute('value', value)
  form.appendChild(i)
}
