import * as assert from 'assert'
import { internet, random } from 'faker'
import 'mocha'
import { stub } from 'sinon'
import { GLOBAL_PLUGIN_NAME } from '../src/constants'

describe('agent', () => {
  const AgentCore = require('../src/core').default
  const Agent = require('../src/agent').default
  const agent = new Agent()

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
    assert.equal(window[GLOBAL_PLUGIN_NAME], undefined)
    agent.provide('dummy', dummyPlugin)
    assert(agent.require('dummy'))

    agent.provide('dummy2', dummyPlugin)
    assert.equal(Object.keys(window[GLOBAL_PLUGIN_NAME]).length, 2)

    const n: number = random.number()
    agent.run('dummy:injectNumber', n)
    // FIXME use spy？
    assert(window['checkNumber'] === n)
  })
})
