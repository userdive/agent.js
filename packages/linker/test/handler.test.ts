import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import { stringify } from 'querystring'
import { spy as sinonSpy } from 'sinon'
import { linkHandler, submitHandler } from '../src/handler'
import { createForm, createLink } from './helpers/dom'

describe('handler', () => {
  const Agent = require('@userdive/agent').default
  const Linker = require('../src/linker').default
  const domain = 'example.com'
  const comUrl = `http://${domain}/example`
  const orgUrl = 'https://example.org/example'

  let agent
  let linker
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
  })

  function setUpLinkEvent (
    href: string,
    domains: Array<string | RegExp>
  ): string {
    const handler: any = linkHandler(domains, agent)
    const a = createLink(href)
    handler({ target: a })
    return a.href
  }

  it('string domain', () => {
    const url = setUpLinkEvent(comUrl, [domain])
    assert(`${comUrl}?${stringify(agent.getLinkParam())}` === url)
  })

  it('regexp match domain', () => {
    const url = setUpLinkEvent(orgUrl, [/^.*\.?example\.org/])
    assert(`${orgUrl}?${stringify(agent.getLinkParam())}` === url)
  })

  it('bubbling', () => {
    const handler: any = linkHandler([domain], agent)
    const a = document.createElement('a')
    a.href = comUrl
    const img = document.createElement('img')
    a.appendChild(img)
    document.body.appendChild(a)
    handler({ target: img })
    assert(`${comUrl}?${stringify(agent.getLinkParam())}` === a.href)
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
    const handler: any = submitHandler([domain], agent)
    const form = createForm(comUrl, 'post')
    handler({ target: form })
    assert(`${comUrl}?${stringify(agent.getLinkParam())}` === form.action)
  })

  it('not cross domain', () => {
    const url = document.location.href
    const handler: any = submitHandler([domain], agent)
    const form = createForm(document.location.href, 'post')
    handler({ target: form })
    assert(url === form.action, 'not added query string')
  })

  it('submit get', () => {
    const handler: any = submitHandler([domain], agent)
    const form = createForm(comUrl, 'get')
    handler({ target: form })
    const hidden = form.firstElementChild
    assert(hidden.getAttribute('type') === 'hidden')
    assert(hidden.getAttribute('name') === '_ud')
    assert(hidden.getAttribute('value') === agent.getLinkParam()['_ud'])
  })
})
