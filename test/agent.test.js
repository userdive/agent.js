/* @flow */
import { describe, it } from 'mocha'
import { random, internet } from 'faker'
import { stub } from 'sinon'
import assert from 'assert'
import * as req from '../src/requests'

describe('agent', () => {
  const AgentCore = require('../src/core').default
  const Agent = require('../src/agent').default
  const agent = new Agent()

  it('create', () => {
    assert(agent.create(random.uuid(), { baseUrl: internet.url() }))
  })

  it('send', () => {
    const listen = stub(AgentCore.prototype, 'listen')

    const stubGet = (url, query, onload, onerror) => {
      onload()
    }
    const get = stub(req, 'get').callsFake(stubGet)

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
})
