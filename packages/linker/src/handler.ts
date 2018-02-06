import Agent from '@userdive/agent'
import * as objectAssign from 'object-assign'
import { parse, stringify } from 'query-string'

const matchUrl = /^https?:\/\/([^\/:]+)/

export function linkHandler (
  domains: any[],
  agent: Agent
): EventListenerOrEventListenerObject {
  return (event: Event) => {
    const e = event || window.event
    if (e) {
      const eventElement: any = e.target || e.srcElement
      const node: HTMLAnchorElement | undefined = scanLinkElement(
        domains,
        eventElement
      )
      if (node) {
        node.href = linkUrl(node.href, agent)
      }
    }
  }
}

export function submitHandler (
  domains: any[],
  agent: Agent
): EventListenerOrEventListenerObject {
  return (event: Event) => {
    const e: any = event || window.event
    if (e) {
      const eventElement: any = e.target || e.srcElement
      if (addableForm(domains, eventElement)) {
        formLink(eventElement, agent)
      }
    }
  }
}

function scanLinkElement (
  domains: any[],
  node: any
): HTMLAnchorElement | undefined {
  for (let i = 100; node && 0 < i; i++) {
    // TODO need area tag support?
    if (node instanceof HTMLAnchorElement && linkable(domains, node)) {
      return node
    }
    node = node.parentNode
  }
  return
}

function linkable (domains: any[], linkElement: HTMLAnchorElement): boolean {
  const protocol: boolean =
    linkElement.protocol === 'http:' || linkElement.protocol === 'https:'
  if (!linkElement.href || !protocol) {
    return false
  }
  const to = linkElement.href || ''
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

function linkUrl (urlString: string, agent: Agent): string {
  const url: string[] = urlString.split('?')
  const queryObj: object = url.length > 1 ? parse(url[1]) : {}
  const query: string = stringify(
    objectAssign({}, queryObj, agent.getLinkParam())
  )
  return `${url[0]}?${query}`
}

function formLink (form: HTMLFormElement, agent: Agent) {
  if (form.method.toLocaleLowerCase() === 'get') {
    const param: { [key: string]: string } = agent.getLinkParam()
    const name: string = Object.keys(param)[0]
    const value: string = param[name]
    const nodes: any = form.childNodes

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].name === name) {
        nodes[i].setAttribute('value', value)
        return
      }
    }
    addHiddenInput(form, name, value)
  } else if (form.method.toLocaleLowerCase() === 'post') {
    form.action = linkUrl(form.action, agent)
  }
}

function addHiddenInput (form: HTMLFormElement, name: string, value: string) {
  const i: HTMLInputElement = document.createElement('input')
  i.setAttribute('type', 'hidden')
  i.setAttribute('name', name)
  i.setAttribute('value', value)
  form.appendChild(i)
}
