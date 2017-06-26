/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { spy as sinonSpy, useFakeTimers } from 'sinon'
import { random } from 'faker'
import { throws } from 'assert-exception'
import isUrl from 'is-url'
import assert from 'assert'
import EventEmitter from 'events'
import {
  SETTINGS as SETTINGS_DEFAULT,
  INTERVAL,
  INTERACT
} from '../src/constants'
import type { EventType } from '../src/types'

describe('core', () => {
  const Agent = require('../src/core').default
  const Base = require('../src/events').default

  function eventFactory (type, emitter) {
    return class DummyEvents extends Base {
      validate () {
        return true
      }
      on () {
        super.on(type, () => {})
        emitter.on(type, data => super.emit(data))
      }
    }
  }

  function agentFactory (options = {}) {
    return new Agent(
      random.uuid(),
      [eventFactory('click', emitter), eventFactory('scroll', emitter)],
      Object.assign({}, SETTINGS_DEFAULT, options)
    )
  }

  let agent, emitter, timer
  beforeEach(() => {
    emitter = new EventEmitter()
    timer = useFakeTimers(new Date().getTime())
    agent = agentFactory()
  })

  afterEach(() => {
    timer.restore()
    agent.destroy()
  })

  it('instance', () => {
    assert(agent)
  })

  it('listen before send pageview', () => {
    assert(
      throws(() => {
        agent.listen()
      }).message === 'need send pageview'
    )

    agent.active = true

    assert(
      throws(() => {
        agent.listen()
      }).message === 'need send pageview'
    )
  })

  function failedUpdateCache (x: number, y: number, type: EventType) {
    agent.send('pageview', location.href)

    emitter.emit(type, { x, y })

    assert.deepEqual(agent._cache.a, {})
    assert.deepEqual(agent._cache.l, {})
    assert(agent.active === false, 'stop agent')
  }

  it('cache failed, scroll', () => {
    failedUpdateCache(10, 0, 'scroll')
  })

  it('cache failed, scroll', () => {
    failedUpdateCache(0, 10, 'scroll')
  })

  it('cache failed, click', () => {
    failedUpdateCache(10, 0, 'click')
  })

  it('cache failed, click', () => {
    failedUpdateCache(0, 10, 'click')
  })

  it('cache success action', () => {
    agent.send('pageview', location.href)
    emitter.emit('click', {
      x: random.number({ min: 1 }),
      y: random.number({ min: 1 })
    })

    assert(agent._cache.a.x > 0)
    assert(agent._cache.a.y > 0)
    assert(agent._cache.a.x === agent._cache.l.x)
    assert(agent._cache.a.y === agent._cache.l.y)
    assert(agent._cache.a.type === 'a')
    assert(typeof agent._cache.a.top === 'number')
    assert(typeof agent._cache.a.left === 'number')
    assert(agent._cache.a.top === agent._cache.l.top)
    assert(agent._cache.a.left === agent._cache.l.top)
    assert(agent._cache.l.type === 'l')

    agent._clear()

    assert.deepEqual(agent._cache.a, {})
    assert.deepEqual(agent._cache.l, {})
  })

  it('cache success looks', () => {
    agent.send('pageview', location.href)
    emitter.emit('scroll', {
      x: random.number({ min: 1 }),
      y: random.number({ min: 1 })
    })

    assert(agent._cache.l.type === 'l')
    assert(agent._cache.l.x > 0)
    assert(agent._cache.l.y > 0)
    assert(typeof agent._cache.l.top === 'number')
    assert(typeof agent._cache.l.left === 'number')
    assert.deepEqual(agent._cache.a, {})

    agent._clear()

    assert.deepEqual(agent._cache.a, {})
    assert.deepEqual(agent._cache.l, {})
  })

  it('send success', () => {
    agent.send('pageview', location.href)

    const spy = sinonSpy(require('../src/requests'), 'get')

    emitter.emit('scroll', {
      x: random.number({ min: 1 }),
      y: random.number({ min: 1 })
    })
    timer.tick(INTERVAL[1] * 1000)
    assert.deepEqual(agent._cache.a, {})
    assert.deepEqual(agent._cache.l, {})
    assert(agent.active)

    for (let i = 0; i <= INTERACT; i++) {
      emitter.emit('scroll', {
        x: random.number({ min: 1 }),
        y: random.number({ min: 1 })
      })
      timer.tick(INTERVAL[1] * 1000)
    }

    const url = spy.getCall(0).args[0]
    assert(url.split('/').length === 7)
    assert(url.split('/')[4].length === 32)
    assert(url.split('/')[5].length === 13)
    assert(url.split('/')[6] === 'int.gif')
    assert(isUrl(url))

    assert(spy.getCall(0).args[1].length === INTERACT)
    assert(spy.getCall(0).args[1][1].split(',').length === 6)

    spy.restore()
  })

  it('send success auto', () => {
    const spy = sinonSpy(require('../src/requests'), 'get')
    const autoAgent = agentFactory({ auto: true })
    autoAgent.send('pageview', location.href)
    const url = spy.getCall(0).args[0]
    assert(url.split('/').length === 7)
    assert(url.split('/')[4].length === 32)
    assert(url.split('/')[5].length === 13)
    assert(url.split('/')[6] === 'env.gif')
  })
})
