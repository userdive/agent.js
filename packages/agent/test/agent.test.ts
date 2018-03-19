import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'
import { spy as sinonSpy, stub } from 'sinon'
import Agent from '../src/agent'
import { INTERVAL } from '../src/constants'
import AgentCore from '../src/core'

describe('agent', () => {
  let agent

  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
  })

  it('constructor', () => {
    const agent: any = new Agent(random.uuid(), 'auto')
    assert(agent.core)
    assert(agent.get('linkerParam'))

    const agent2 = new Agent(random.uuid(), { allowLink: true })
    assert(agent.get('linkerParam'))
  })

  it('linkerParam', () => {
    assert(agent.get(random.word()) === '', 'undefined key')
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

  describe('plugin', () => {
    const pluginName = lorem.word()
    class Plugin {
      tracker: any
      constructor (tracker) {
        assert(tracker.plugins[pluginName])
      }
      echo (value: string) {
        assert(value === 'hello')
      }
    }

    it('use plugin', () => {
      agent.provide(pluginName, Plugin)
      assert(agent.plugins[pluginName] === Plugin)
      assert(agent.require(pluginName))

      agent.provide(lorem.word(), Plugin)
      assert(Object.keys(agent.plugins).length === 2)

      const spy = sinonSpy(agent.plugins[name], 'echo')
      agent.run(name, 'echo', lorem.word())
      assert(spy.calledOnce)
    })

    it('not provide plugin', () => {
      assert(agent.require(lorem.word()) === false)
    })
  })
})
