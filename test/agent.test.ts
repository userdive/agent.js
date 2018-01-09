import * as assert from 'assert'
import { throws } from 'assert-exception'
import { internet, random } from 'faker'
import 'mocha'
import { spy, stub } from 'sinon'

describe('agent', () => {
  const AgentCore = require('../src/core').default
  const Agent = require('../src/agent').default
  const agent = new Agent()

  it('create', () => {
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

  it('provide', () => {
    const pluginName = random.alphaNumeric()
    const Plugin = spy()
    agent.provide(pluginName, Plugin)
    assert(agent.plugins[pluginName] === Plugin)
  })

  it('require', () => {
    const pluginName = random.alphaNumeric()
    assert(throws(() => agent.require(pluginName, Plugin)).message)
  })

  it('run', () => {
    assert(
      throws(() => agent.run(random.alphaNumeric(), random.alphaNumeric()))
        .message
    )
  })

  it('set', () => {
    assert(agent.set('key', 'value'))
    assert(agent.set({ key: 'value' }))
  })
})
