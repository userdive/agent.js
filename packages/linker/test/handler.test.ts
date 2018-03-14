import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'
import { createForm, createLink } from './helpers/dom'

describe('handler', () => {
  const { link, submit } = require('../src/handler')
  const domain = 'example.com'
  const comUrl = `http://${domain}/example`
  const orgUrl = 'https://example.org/example'

  let agent
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
  })

  const setUpLinkEvent = (
    href: string,
    domains: Array<string | RegExp>
  ): string => {
    const handler: any = link(domains, agent.get('linkerParam'))
    const a = createLink(href)
    handler({ target: a })
    return a.href
  }

  it('string domain', () => {
    const url = setUpLinkEvent(comUrl, [domain])
    assert(`${comUrl}?${agent.get('linkerParam')}` === url)
  })

  it('regexp match domain', () => {
    const url = setUpLinkEvent(orgUrl, [/^.*\.?example\.org/])
    assert(`${orgUrl}?${agent.get('linkerParam')}` === url)
  })

  it('bubbling', () => {
    const handler = link([domain], agent.get('linkerParam'))
    const a = document.createElement('a')
    a.href = comUrl
    const img = document.createElement('img')
    a.appendChild(img)
    document.body.appendChild(a)
    // idempotence
    handler({ target: img } as any)
    handler({ target: img } as any)

    assert(`${comUrl}?${agent.get('linkerParam')}` === a.href)
  })

  it('not match domain', () => {
    const url = setUpLinkEvent(comUrl, ['example.net'])
    assert(comUrl === url)
  })

  it('not have href', () => {
    const url = setUpLinkEvent(undefined, ['example.net'])
    assert(url === '')
  })

  it('submit post', () => {
    const handler = submit([domain], agent.get('linkerParam'))
    const form = createForm(comUrl, 'post')
    handler({ target: form } as any)
    assert(`${comUrl}?${agent.get('linkerParam')}` === form.action)
  })

  it('submit javascript:void(0);', () => {
    const action = 'javascript:void(0)'
    const form = createForm(comUrl, action)
    const handler = submit([domain], agent.get('linkerParam'))
    handler({ target: document } as any)
    assert(action === form.action)
  })

  it('not cross domain', () => {
    const url = document.location.href
    const handler = submit([domain], agent.get('linkerParam'))
    const form = createForm(document.location.href, 'post')
    handler({ target: form } as any)
    assert(url === form.action, 'not added query string')
  })

  it('submit get', () => {
    const handler = submit([domain], agent.get('linkerParam'))
    const form = createForm(comUrl, 'get')

    // idempotence
    handler({ target: form } as any)
    handler({ target: form } as any)

    assert(document.getElementsByTagName('input').length === 1)
    const hidden = form.firstElementChild
    assert(hidden.getAttribute('type') === 'hidden')
    assert(
      hidden.getAttribute('name') === agent.get('linkerParam').split('=')[0]
    )
    assert(
      hidden.getAttribute('value') === agent.get('linkerParam').split('=')[1]
    )
  })
})
