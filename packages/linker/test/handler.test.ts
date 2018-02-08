import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import { stringify } from 'querystring'
import { spy as sinonSpy } from 'sinon'
import { linkHandler, submitHandler } from '../src/handler'
import { createForm, createLink } from './helpers/dom'
import { createEvent } from './helpers/event'

describe('handler', () => {
  const Agent = require('@userdive/agent').default
  const Linker = require('../src/linker').default
  const domain = 'example.com'
  const comUrl = `http://${domain}/example`
  const orgUrl = 'https://example.org/example'

  let agent
  let linker
  beforeEach(() => {
    agent = new Agent(random.uuid(), { allowLink: true })
  })

  function setUpLinkEvent (
    href: string,
    domains: Array<string | RegExp>,
    e: Event
  ): string {
    const handler: any = linkHandler(domains, agent)
    const a = createLink(href)
    a.dispatchEvent(e)
    handler(e)
    return a.href
  }

  it('mousedown', () => {
    const e = createEvent('MouseEvents', 'mousedown')
    const url = setUpLinkEvent(comUrl, [domain], e)
    assert(`${comUrl}?${stringify(agent.getLinkParam())}` === url)
  })

  it('regexp match domain', () => {
    const e = createEvent('MouseEvents', 'mousedown')
    const url = setUpLinkEvent(orgUrl, [/^.*\.?example\.org/], e)
    assert(`${orgUrl}?${stringify(agent.getLinkParam())}` === url)
  })

  it('keyup', () => {
    const e = createEvent('KeyboardEvent', 'keyup')
    const url = setUpLinkEvent(comUrl, [domain], e)
    assert(`${comUrl}?${stringify(agent.getLinkParam())}` === url)
  })

  it('not match domain', () => {
    const e = createEvent('KeyboardEvent', 'keyup')
    const url = setUpLinkEvent(comUrl, ['example.net'], e)
    assert(comUrl === url)
  })

  it('submit post', () => {
    const handler: any = submitHandler([domain], agent)
    const form = createForm(comUrl, 'post')
    const e = createEvent('Event', 'submit')
    form.dispatchEvent(e)
    handler(e)
    assert(`${comUrl}?${stringify(agent.getLinkParam())}` === form.action)
  })

  it('submit get', () => {
    const handler: any = submitHandler([domain], agent)
    const form = createForm(comUrl, 'get')
    const e = createEvent('Event', 'submit')
    form.dispatchEvent(e)
    handler(e)
    const hidden = form.firstElementChild
    assert(hidden.getAttribute('type') === 'hidden')
    assert(hidden.getAttribute('name') === '_ud')
    assert(hidden.getAttribute('value') === agent.getLinkParam()['_ud'])
  })
})
