import Agent from '@userdive/agent'
import * as assert from 'assert'
import { image, internet, random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'
import { link, submit } from '../src/handler'

const toLink = (href: string) => {
  const link = document.createElement('a')
  link.href = href
  return link
}

describe('handler', () => {
  let agent
  let param
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
    param = agent.get('linkerParam')
  })

  afterEach(() => {
    fixture.cleanup()
  })

  it('string domain', () => {
    const l = toLink(internet.url())
    fixture.set(`<a href="${l.href}" />`, true)
    const a = document.getElementsByTagName('a')[0]
    link([l.hostname], param, 10)({ target: a } as any)
    assert(`${l.href}?${param}` === a.href)
  })

  it('regexp match domain', () => {
    const l = toLink(internet.url())
    fixture.set(`<a href="${l.href}">${random.word()}</a>`, true)

    const a = document.getElementsByTagName('a')[0]
    link([new RegExp(`${l.hostname}`)], param, 10)({ target: a } as any)
    assert(`${l.href}?${param}` === a.href)
  })

  it('email link', () => {
    const l = toLink(`mailto:${internet.email()}`)
    fixture.set(`<a href=${l.href}>${random.word()}</a>`, true)

    const a = document.getElementsByTagName('a')[0]
    link([l.hostname], param, 10)({ target: a } as any)
    assert(l.href === a.href)
  })

  it('match domain', () => {
    fixture.set(`<a href="${location.href}">${random.word()}</a>`, true)

    const a = document.getElementsByTagName('a')[0]
    link([location.hostname], param, 10)({ target: a } as any)
    assert(location.href === a.href)
  })

  it('is defined query', () => {
    // FIXME https://github.com/Microsoft/TypeScript/issues/21943
    const l: any = toLink(`${internet.url()}?a=b#anker`)
    fixture.set(`<a href="${l.href}">${random.word()}</a>`, true)
    const a = document.getElementsByTagName('a')[0]
    link([l.hostname], param, 10)({ target: a } as any)
    assert(`${l.origin}${l.pathname}${l.search}&${param}${l.hash}` === a.href)
  })

  it('bubbling', () => {
    const l = toLink(internet.url())
    fixture.set(`<a href="${l.href}"><img src="${image.imageUrl()}"></a>`)

    link([l.hostname], param, 10)({
      target: document.getElementsByTagName('img')[0]
    } as any)
    assert(`${l.href}?${param}` === document.getElementsByTagName('a')[0].href)

    fixture.cleanup()
    fixture.set(
      `<a href="${l.href}"><div><img src="${image.imageUrl()}"></div></a>`
    )

    link([l.hostname], param, 1)({
      target: document.getElementsByTagName('img')[0]
    } as any)
    assert(
      l.href === document.getElementsByTagName('a')[0].href,
      'already checked max parentNode'
    )
  })

  it('submit post', () => {
    const l = toLink(internet.url())
    fixture.set(`<form method="post" action="${l.href}"><form>`, true)

    const form = document.getElementsByTagName('form')[0]
    submit([l.hostname], param)({ target: form } as any)
    assert(`${l.href}?${param}` === form.action)
  })

  it('submit javascript:void(0);', () => {
    const l = toLink(internet.url())
    const action = 'javascript:void(0)'
    fixture.set(
      `<form action="${action}"><input type="submit" value="test" ></form>`,
      true
    )

    const form = document.getElementsByTagName('form')[0]
    submit([l.hostname], param)({ target: form } as any)
    assert(action === form.action)
  })

  it('not cross domain', () => {
    const l = toLink(internet.url())
    fixture.set(`<form method="get" action="${l.href}"><form>`, true)

    const form = document.getElementsByTagName('form')[0]
    submit([internet.domainName()], param)({ target: form } as any)
    assert(l.href === form.action, 'not added query string')
  })

  it('submit get', () => {
    const link = toLink(internet.url())
    const handler = submit([link.hostname], param)
    fixture.set(`<form method="get" action="${link.href}"><form>`, true)
    const form = document.getElementsByTagName('form')[0]

    // idempotence
    handler({ target: form } as any)
    handler({ target: form } as any)

    assert(document.getElementsByTagName('input').length === 1)
    const hidden = form.firstElementChild
    const [key, value] = param.split('=')
    assert(hidden.getAttribute('type') === 'hidden')
    assert(hidden.getAttribute('name') === key)
    assert(hidden.getAttribute('value') === value)
  })
})
