import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'
import Linker from '../src/linker'

describe('linker', () => {
  const Agent = require('@userdive/agent').default
  const Linker = require('../src/linker').default

  let agent
  let linker
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
    linker = new Linker(agent)
  })

  it('constructor', () => {
    assert(linker.param)
  })

  it('event listener', () => {
    const hasListener = 'onmousedown' in window || 'onkeyup' in window
    assert(hasListener)
  })

  it('set  litener', () => {
    const spy = sinonSpy(linker, 'setListener')
    linker.autoLink([/^.*\.?example\.org/, 'example.com'])
    assert(spy.callCount === 3)
  })
})
