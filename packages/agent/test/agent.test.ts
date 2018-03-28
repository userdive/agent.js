import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'
import Agent from '../src/agent'
import { INTERVAL } from '../src/constants'

describe('agent', () => {
  let agent: any

  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto', {})
  })

  it('constructor', () => {
    const agent: any = new Agent(random.uuid(), 'auto', {})
    assert(agent.core)
    assert(agent.get('linkerParam'))

    const agent2: any = new Agent(random.uuid(), 'auto', {
      allowLinker: true,
      cookieName: lorem.word(),
      cookieDomain: internet.domainName(),
      cookieExpires: random.number()
    })
    assert(agent2.get('linkerParam'))

    const agent3: any = new Agent(random.uuid(), 'auto', {
      allowLinker: true
    })
    assert(agent3.get('linkerParam'))
  })

  it('linkerParam', () => {
    assert(agent.get(random.word()) === '', 'undefined key')
  })

  it('send', () => {
    const spy = sinonSpy(require('../src/requests'), 'get')

    const page = internet.url()
    const dimension1 = lorem.word()
    const core = agent.send('pageview', {
      page,
      dimension1
    })
    assert(core.interactId === 1)
    const args = spy.getCall(0).args[1]
    assert(args[1] === `l=${encodeURIComponent(page)}`)
    assert(args[args.length - 1] === `cd1=${dimension1}`)
    assert.deepEqual(core.state.custom, {})
    assert(core.state.env.l === undefined)
    assert(core.interval.length === INTERVAL.length - 1)
    spy.restore()
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
      constructor (tracker: any) {
        assert(tracker.plugins[pluginName])
      }
      echo (value: 'hello') {
        assert(value === 'hello')
      }
    }

    it('use plugin', () => {
      agent.provide(pluginName, Plugin)
      assert(agent.plugins[pluginName] === Plugin)
      assert(agent.require(pluginName))

      const spy = sinonSpy(agent.plugins[pluginName], 'echo')
      agent.run(pluginName, 'echo', 'hello')
      assert(spy.calledOnce)

      agent.provide(lorem.word(), Plugin)
      assert(Object.keys(agent.plugins).length === 2)
    })

    it('not provide plugin', () => {
      assert(agent.require(lorem.word()) === false)
    })
  })
})
