/* @flow */
import { describe, it } from 'mocha'
import { random, internet } from 'faker'
import { stub } from 'sinon'
import assert from 'assert'

describe('agent', () => {
  const AgentCore = require('../src/core').default
  const agent = require('../src/agent').default

  it('create', () => {
    assert(agent.create(random.uuid(), {baseUrl: internet.url()}))
  })

  it('send', () => {
    const listen = stub(AgentCore.prototype, 'listen')
    assert(agent.send('pageview') === undefined)
    assert(agent.send('pageview') === undefined, 'take2')
    listen.restore()
  })

  it('set', () => {
    assert(agent.set('key', 'value'))
    assert(agent.set({'key': 'value'}))
  })
})
