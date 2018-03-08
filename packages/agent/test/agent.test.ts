import * as assert from 'assert'
import { internet, random } from 'faker'
import 'mocha'
import { spy as sinonSpy, stub } from 'sinon'
import Agent from '../src/agent'
import { INTERVAL } from '../src/constants'

describe('agent', () => {
  const AgentCore = require('../src/core').default
  const Agent = require('../src/agent').default
  let agent

  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
  })

  it('constructor', () => {
    const agent = new Agent(random.uuid(), 'auto')
    assert(agent.core)
    assert(agent.get('linkerParam'))

    const agent2 = new Agent(random.uuid(), { allowLink: true })
    assert(agent.get('linkerParam'))
  })

  it('linkerParam', () => {
    assert(agent.get(random.word()) === '', 'undefined key')
  })

  it('create', () => {
    assert(agent.create(random.uuid(), 'auto'))
    assert(agent.create(random.uuid(), { baseUrl: internet.url() }))
  })

  it('send', () => {
    const core = agent.send('pageview')
    assert(core.interactId === 1)
    assert(core.interval.length === INTERVAL.length - 1)
  })

  it('set', () => {
    assert(agent.set('key', 'value'))
    assert(agent.set({ key: 'value' }))
  })

  it('subscribe', () => {
    assert(
      agent.subscribe(window, random.word(), function () {
        // nothing todo
      })
    )
  })

  it('use plugin', () => {
    const dummyPlugin = require('./helpers/plugin').default
    agent.provide('dummy', dummyPlugin)
    assert.equal(agent.plugins['dummy'], dummyPlugin)
    assert(agent.require('dummy', {}))

    agent.provide('dummy2', dummyPlugin)
    assert(agent.plugins['dummy2'])
    assert.equal(Object.keys(agent.plugins).length, 2)

    const spy = sinonSpy(agent.plugins['dummy'], 'injectLocation')
    const l: string = internet.url()
    agent.run('dummy', 'injectLocation', l)
    assert(spy.calledOnce)
  })
})
