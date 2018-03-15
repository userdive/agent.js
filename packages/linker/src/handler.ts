const matchUrl = /^https?:\/\/([^\/:]+)/
export type Domain = string | RegExp

export function link (domains: Domain[], linkerParam: string) {
  return ({ target, srcElement }: Event) => {
    const eventElement: any = target || srcElement
    scanLinkElement(linkerParam, domains, eventElement)
  }
}

export function submit (domains: Domain[], linkerParam: string) {
  return ({ target, srcElement }: Event) => {
    const eventElement: any = target || srcElement
    if (addableForm(domains, eventElement)) {
      formLink(eventElement, linkerParam)
    }
  }
}

function scanLinkElement (linkerParam: string, domains: Domain[], node: any) {
  for (let i = 0; i < 100 && node; i++) {
    // TODO need area tag support?
    if (node instanceof HTMLAnchorElement && linkable(domains, node)) {
      node.href = linkUrl(node.href, linkerParam)
      return
    }
    node = node.parentNode
  }
}

function linkable (
  domains: Domain[],
  { protocol, href }: HTMLAnchorElement
): boolean {
  const isHttp = protocol === 'http:' || protocol === 'https:'
  if (!href || !isHttp) {
    return false
  }
  return matchDomain(domains, href)
}

function addableForm (domains: Domain[], element: any) {
  let match
  if (element instanceof HTMLFormElement && element.action) {
    match = element.action.match(matchUrl)
  }
  return match ? matchDomain(domains, match[1]) : false
}

const re = new RegExp(location.hostname)
function matchDomain (domains: Domain[], href: string): boolean {
  if (href.match(re)) {
    return false
  }

  return domains.some(
    (d: any) => (d instanceof RegExp && d.test(href)) || href.indexOf(d) >= 0
  )
}

function linkUrl (href: string, linkerParam: string): string {
  const e = document.createElement('a')
  e.href = href
  const qs = e.search.trim().replace(/^[?#&]/, '')
  if (
    !qs
      .split('&')
      .filter(
        link => link.length && link.split('=')[0] === linkerParam.split('=')[0]
      ).length
  ) {
    e.search = e.search ? `${e.search}&${linkerParam}` : linkerParam
  }
  return e.href
}

function formLink (form: HTMLFormElement, linkerParam: string) {
  if (form.method.toLocaleLowerCase() === 'get') {
    addHiddenInput(form, linkerParam)
  } else if (form.method.toLocaleLowerCase() === 'post') {
    form.action = linkUrl(form.action, linkerParam)
  }
}

function addHiddenInput (form: HTMLFormElement, linkerParam: string) {
  const [key, value]: string[] = linkerParam.split('=')
  const nodes: any = form.childNodes

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].name === key) {
      nodes[i].setAttribute('value', value)
      return
    }
  }
  const i: HTMLInputElement = document.createElement('input')
  i.setAttribute('type', 'hidden')
  i.setAttribute('name', key)
  i.setAttribute('value', value)
  form.appendChild(i)
}
