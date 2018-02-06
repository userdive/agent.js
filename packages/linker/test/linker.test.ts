import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import * as objectAssign from 'object-assign'
import { parse, stringify } from 'query-string'
import { spy as sinonSpy } from 'sinon'
import Linker from '../src/linker'

describe('linker', () => {
  const Agent = require('@userdive/agent').default
  const Linker = require('../src/linker').default

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

  const createLink = (href: string) => {
    let link = document.createElement('a')
    link.href = href
    document.body.appendChild(link)
    return link
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
    const link = createLink('http://example.com/example')
    const before = link.href
    const mousedown = simulateEvent('MouseEvents', 'mousedown')
    link.dispatchEvent(mousedown)
    const query = stringify(agent.getLinkParam())
    assert(`${before}?${query}` === link.href)
  })

  itIgnoreEvent('onkeyup')('keyup', () => {
    const link = createLink('http://example.com/example')
    const before = link.href
    const keyup = simulateEvent('KeyboardEvent', 'keyup')
    link.dispatchEvent(keyup)
    const query = stringify(agent.getLinkParam())
    assert(`${before}?${query}` === link.href)
  })

  itIgnoreEvent('onmousedown')('keep query', () => {
    const params = { key1: 'value1', key2: 'value2' }
    const link = createLink(`http://example.org/example?${stringify(params)}`)
    const before = link.href
    const mousedown = simulateEvent('MouseEvents', 'mousedown')
    link.dispatchEvent(mousedown)
    const query = parse(link.href.split('?')[1])
    assert.deepEqual(query, objectAssign(params, agent.getLinkParam()))
  })
})
