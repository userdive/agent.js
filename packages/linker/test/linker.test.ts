import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import Linker from '../src/linker'

describe('linker', () => {
  let agent
  let linker
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
    linker = new Linker(agent)
  })

  it('constructor', () => {
    assert(linker.agent)
  })

  it('event listener', () => {
    const hasListener = 'onmousedown' in window || 'onkeyup' in window
    assert(hasListener)
  })

  it('handlers', () => {
    linker.autoLink([/^.*\.?example\.org/, 'example.com'])
    assert(agent.core.observer.hasSubscriber(document, 'mousedown'))
    assert(agent.core.observer.hasSubscriber(document, 'keyup'))
  })
})
