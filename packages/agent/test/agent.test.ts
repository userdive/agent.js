import * as assert from 'assert'
import { internet, random } from 'faker'
import 'mocha'
import { spy as sinonSpy, stub } from 'sinon'
import Agent from '../src/agent'

describe('agent', () => {
  const AgentCore = require('../src/core').default
  const Agent = require('../src/agent').default
  const agent: Agent = new Agent()

  it('constructor', () => {
    const agent = new Agent(random.uuid(), 'auto')
    assert(agent.core)
  })

  it('create', () => {
    assert(agent.create(random.uuid(), 'auto'))
    assert(agent.create(random.uuid(), { baseUrl: internet.url() }))
  })

  it('send', () => {
    const listen = stub(AgentCore.prototype, 'listen')

    const get = stub(require('../src/requests'), 'get')
    get.callsFake((url, query, onload, onerror) => {
      onload()
    })

    let core = agent.send('pageview')
    assert(core.active)

    core = agent.send('pageview')
    assert(core.active, 'take2')

    listen.restore()
    get.restore()
  })

  it('set', () => {
    assert(agent.set('key', 'value'))
    assert(agent.set({ key: 'value' }))
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
