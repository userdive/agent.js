import * as assert from 'assert'
import { throws } from 'assert-exception'
import { EventEmitter } from 'events'
import { internet, lorem, random } from 'faker'
import 'mocha'
import * as objectAssign from 'object-assign'
import { spy as sinonSpy, stub as sinonStub, useFakeTimers } from 'sinon'

import {
  INTERACT,
  INTERVAL,
  SETTINGS as SETTINGS_DEFAULT
} from '../src/constants'
import Agent from '../src/core'
import Base from '../src/events'
import { EventType } from '../src/types'
import { getType } from './helpers/Event'

describe('AgentCore', () => {
  const isUrl = require('is-url')
  const eventFactory = (type, emitter) =>
    class DummyEvents extends Base {
      validate () {
        return true
      }
      on () {
        super.on(
          type,
          () => {
            //
          },
          getType(type)
        )
        emitter.on(type, data => super.emit(data))
      }
    }

  const agentFactory = (options = {}) =>
    new Agent(
      random.uuid(),
      [eventFactory('click', emitter), eventFactory('scroll', emitter)],
      objectAssign({}, SETTINGS_DEFAULT, options)
    )

  let agent
  let emitter
  let timer
  beforeEach(() => {
    emitter = new EventEmitter()
    timer = useFakeTimers(new Date().getTime())
    agent = agentFactory()
  })

  afterEach(() => {
    timer.restore()
    agent.destroy()
    assert(agent.emitter.listenerCount(agent.id) === 0)
  })

  it('instance', () => {
    assert(agent)
  })

  const failedUpdateCache = (x: number, y: number, type: EventType) => {
    agent.pageview(location.href)

    emitter.emit(type, { x, y })

    assert.deepEqual(agent.cache.a, {})
    assert.deepEqual(agent.cache.l, {})
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
    agent.pageview(location.href)
    assert(agent.emitter.listenerCount(agent.id) === 1)
    emitter.emit('click', {
      x: random.number({ min: 1 }),
      y: random.number({ min: 1 })
    })

    assert(agent.cache.a.type === 'a')
    assert(agent.cache.a.x > 0)
    assert(agent.cache.a.y > 0)
    assert(typeof agent.cache.a.top === 'number')
    assert(typeof agent.cache.a.left === 'number')
    assert.deepEqual(agent.cache.l, {})

    agent.clear()

    assert.deepEqual(agent.cache.a, {})
    assert.deepEqual(agent.cache.l, {})
  })

  it('cache success looks', () => {
    agent.pageview(location.href)
    emitter.emit('scroll', {
      x: random.number({ min: 1 }),
      y: random.number({ min: 1 })
    })

    assert(agent.cache.l.type === 'l')
    assert(agent.cache.l.x > 0)
    assert(agent.cache.l.y > 0)
    assert(typeof agent.cache.l.top === 'number')
    assert(typeof agent.cache.l.left === 'number')
    assert.deepEqual(agent.cache.a, {})

    agent.clear()

    assert.deepEqual(agent.cache.a, {})
    assert.deepEqual(agent.cache.l, {})
  })

  it('send success', () => {
    agent.pageview(location.href)

    const spy = sinonSpy(require('../src/requests'), 'get')

    assert(agent.interacts.length === 0)
    emitter.emit('scroll', {
      x: random.number({ min: 1 }),
      y: random.number({ min: 1 })
    })
    timer.tick(INTERVAL[1] * 1000)
    assert(agent.interacts.length === 1)
    assert.deepEqual(agent.cache.a, {})
    assert.deepEqual(agent.cache.l, {})

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
    const autoAgent = agentFactory({ cookieName: 'auto' })
    autoAgent.pageview(location.href)

    const url = spy.getCall(0).args[0]
    assert(url.split('/').length === 7)
    assert(url.split('/')[4].length === 32)
    assert(url.split('/')[5].length === 13)
    assert(url.split('/')[6] === 'env.gif')

    const query = spy.getCall(0).args[1]
    assert(query.length === 8)
    assert(query[1] === `l=${encodeURIComponent(location.href)}`)
    spy.restore()
  })

  it('send success pathname', () => {
    const spy = sinonSpy(require('../src/requests'), 'get')
    const autoAgent = agentFactory({ cookieName: 'auto' })
    autoAgent.pageview(location.pathname)

    const query = spy.getCall(0).args[1]
    assert(query.length === 8)
    assert(query[1] === `l=${encodeURIComponent(location.href)}`)
    spy.restore()
  })

  it('send event', () => {
    const agent = agentFactory({ auto: true })
    agent.pageview(internet.url())
    const spy = sinonSpy(require('../src/requests'), 'get')

    const sendEvent = data => {
      agent.event(data)
      const query = spy.getCall(0).args[1]
      const [key, value] = query[0].split('=')
      assert(key === 'e')
      return value.split(',')
    }

    let eventParams = sendEvent({
      eventCategory: lorem.word(),
      eventAction: lorem.word(),
      eventLabel: lorem.word(),
      eventValue: random.number()
    })
    assert(eventParams.length === 5)
    assert(eventParams[0] === '1')
    spy.reset()

    eventParams = sendEvent({
      eventCategory: lorem.word(),
      eventAction: lorem.word(),
      eventLabel: lorem.word()
    })
    assert(eventParams.length === 4)
    assert(eventParams[0] === '2')
    spy.reset()

    eventParams = sendEvent({
      eventCategory: lorem.word(),
      eventAction: lorem.word(),
      eventValue: random.number()
    })
    assert(eventParams.length === 5)
    assert(eventParams[0] === '3')
    assert(eventParams[3] === '')
    spy.restore()
  })

  it('send fail', () => {
    const stub = sinonStub(require('../src/requests'), 'get')
    stub.callsFake((url, query, onerror) => {
      onerror()
    })

    agent.pageview(location.href)
    assert(agent.loadTime === 0)
    stub.restore()
  })
})
