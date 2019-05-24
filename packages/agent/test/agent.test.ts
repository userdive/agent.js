import * as assert from 'assert'

import { internet, lorem, random } from 'faker'
import { get as getCookie } from 'js-cookie'
import 'mocha'
import { spy as sinonSpy, stub as sinonStub } from 'sinon'

import Agent from '../src/agent'
import { INTERVAL, SETTINGS } from '../src/constants'

describe('agent', () => {
  let agent: any

  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto', {})
  })

  it('constructor', () => {
    const agent: any = new Agent(random.uuid(), 'auto', {})
    assert(agent.core)
    assert.strictEqual(
      agent.get('linkerParam'),
      `${SETTINGS.linkerName}=${getCookie(SETTINGS.cookieName)}`
    )

    const cookieName = lorem.word()
    const agent2: any = new Agent(random.uuid(), 'auto', {
      allowLinker: true,
      cookieName,
      cookieExpires: random.number(),
    })
    assert.strictEqual(
      agent2.get('linkerParam'),
      `${SETTINGS.linkerName}=${getCookie(cookieName)}`
    )

    const stub = sinonStub(require('../src/browser'), 'getLocation')
    const before = getCookie(SETTINGS.cookieName)
    stub.callsFake(() => {
      const link = document.createElement('a')
      link.href = location.href
      link.search = `${SETTINGS.linkerName}=${before}`
      return link
    })
    const agent3: any = new Agent(random.uuid(), 'auto', {
      allowLinker: true,
    })
    assert.strictEqual(
      agent3.get('linkerParam'),
      `${SETTINGS.linkerName}=${before}`
    )
    stub.restore()
  })

  it('get clientId', () => {
    const clientId = getCookie(SETTINGS.cookieName)
    assert.strictEqual(agent.get('clientId'), clientId)
  })

  it('get with undefined key', () => {
    assert(agent.get(random.word()) === '', 'undefined key')
  })

  it('send', () => {
    const spy = sinonSpy(require('../src/requests'), 'get')

    const page = internet.url()
    const dimension1 = lorem.word()
    const core = agent.send('pageview', {
      page,
      dimension1,
    })
    assert(core.interactionId === 1)
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
      agent.subscribe(window, random.word(), function() {
        // nothing todo
      })
    )
  })

  describe('plugin', () => {
    const pluginName = lorem.word()
    class Plugin {
      public constructor(tracker: any) {
        assert(tracker.plugins[pluginName])
      }
      public echo(value: 'hello') {
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

      agent.provide(random.uuid(), Plugin)
      assert(Object.keys(agent.plugins).length === 2)
    })

    it('not provide plugin', () => {
      assert(agent.require(lorem.word()) === false)
    })
  })
})
