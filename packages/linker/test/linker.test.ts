import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import * as objectAssign from 'object-assign'
import { parse, stringify } from 'query-string'
import Linker from '../src/linker'
import { createForm, createLink } from './helpers/dom'

describe('linker', () => {
  const Agent = require('@userdive/agent').default
  const Linker = require('../src/linker').default
  const urlMatchString = 'http://example.com/example'
  const urlMatchRegexp = 'http://example.org/example'

  let agent
  let linker
  beforeEach(() => {
    agent = new Agent(random.uuid(), { allowLink: true })
    linker = new Linker(agent)
    linker.autoLink([/^.*\.?example\.org/, 'example.com'])
  })

  const itIgnoreEvent = (listenerName: string): Function => {
    return listenerName in window ? it : it.skip
  }

  const simulateEvent = (eventInterface: string, eventName: string) => {
    let e
    if (typeof Event === 'function') {
      e = new Event(eventName)
    } else {
      e = document.createEvent(eventInterface)
      e.initEvent(eventName, true, true)
    }
    return e
  }

  it('constructor', () => {
    assert(linker.agent)
  })

  it('event listener', () => {
    const hasListener = 'onmousedown' in window || 'onkeyup' in window
    assert(hasListener)
  })

  itIgnoreEvent('onmousedown')('mousedown', () => {
    const link = createLink(urlMatchString)
    const e = simulateEvent('MouseEvents', 'mousedown')
    link.dispatchEvent(e)
    const query = stringify(agent.getLinkParam())
    assert(`${urlMatchString}?${query}` === link.href, 'string domain match')
  })

  itIgnoreEvent('onmousedown')('regexp domain', () => {
    const link = createLink(urlMatchRegexp)
    const e = simulateEvent('MouseEvents', 'mousedown')
    link.dispatchEvent(e)
    const query = stringify(agent.getLinkParam())
    assert(`${urlMatchRegexp}?${query}` === link.href, 'regexp domain match')
  })

  itIgnoreEvent('onkeyup')('keyup', () => {
    const link = createLink(urlMatchString)
    const keyup = simulateEvent('KeyboardEvent', 'keyup')
    link.dispatchEvent(keyup)
    const query = stringify(agent.getLinkParam())
    assert(`${urlMatchString}?${query}` === link.href)
  })

  itIgnoreEvent('onmousedown')('keep original query string', () => {
    const params = { key1: 'value1', key2: 'value2' }
    const link = createLink(`${urlMatchString}?${stringify(params)}`)
    const mousedown = simulateEvent('MouseEvents', 'mousedown')
    link.dispatchEvent(mousedown)
    const query = parse(link.href.split('?')[1])
    assert.deepEqual(query, objectAssign(params, agent.getLinkParam()))
  })

  it('submit post', () => {
    const form = createForm(urlMatchString, 'post')
    const submit = simulateEvent('Event', 'submit')
    form.dispatchEvent(submit)
    const query = stringify(agent.getLinkParam())
    assert(
      `${urlMatchString}?${query}` === form.action,
      'add query string before post'
    )
  })

  it('submit get', () => {
    const form = createForm(urlMatchString, 'get')
    const submit = simulateEvent('Event', 'submit')
    form.dispatchEvent(submit)
    const hidden = form.firstElementChild
    assert(hidden.getAttribute('type') === 'hidden')
    assert(hidden.getAttribute('name') === '_ud')
    assert(hidden.getAttribute('value') === agent.getLinkParam()['_ud'])
  })
})
