import * as assert from 'assert'
import { EventEmitter } from 'events'
import { internet, lorem, random } from 'faker'
import 'mocha'
import * as objectAssign from 'object-assign'
import { spy as sinonSpy, stub as sinonStub, useFakeTimers } from 'sinon'
import { FieldsObject } from 'userdive/lib/types'

import {
  INTERACTION,
  INTERVAL,
  SETTINGS as SETTINGS_DEFAULT
} from '../src/constants'
import Agent from '../src/core'
import Base from '../src/events'
import { EventType } from '../src/types'

describe('AgentCore', () => {
  const isUrl = require('is-url')
  const eventFactory = (eventType: EventType, emitter: EventEmitter) =>
    class DummyEvents extends Base<UIEvent> {
      public validate () {
        return true
      }
      public on () {
        super.on(
          eventType,
          () => {
            //
          }
        )
        emitter.on(eventType, (data) => super.emit(data))
      }
    }

  const agentFactory = (options = {}): any =>
    new Agent(
      random.uuid(),
      [eventFactory('click', emitter), eventFactory('scroll', emitter)],
      objectAssign({}, SETTINGS_DEFAULT, options)
    )

  let agent: any
  let emitter: any
  let timer: any
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
      type: 'a',
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
      type: 'l',
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

  it('update', () => {
    agent.pageview(location.href)
    emitter.emit('click', {
      type: 'a',
      x: random.number({ min: 1 }),
      y: random.number({ min: 1 })
    })
    assert(agent.interactions.length === 0)

    agent.update()
    assert(agent.interactions.length === 1)
    assert(agent.interactions[0].type === 'a')
  })

  it('send success', () => {
    agent.pageview(location.href)

    const spy = sinonSpy(require('../src/requests'), 'get')

    assert(agent.interactions.length === 0)
    emitter.emit('scroll', {
      type: 'l',
      x: random.number({ min: 1 }),
      y: random.number({ min: 1 })
    })
    timer.tick(INTERVAL[1] * 1000)
    assert(agent.interactions.length === 1)
    assert.deepEqual(agent.cache.a, {})
    assert.deepEqual(agent.cache.l, {})

    for (let i = 0; i <= INTERACTION; i++) {
      emitter.emit('scroll', {
        type: 'l',
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

    assert(spy.getCall(0).args[1].length === INTERACTION)
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

    const sendEvent = (data: FieldsObject) => {
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
    spy.resetHistory()

    eventParams = sendEvent({
      eventCategory: lorem.word(),
      eventAction: lorem.word(),
      eventLabel: lorem.word()
    })
    assert(eventParams.length === 4)
    assert(eventParams[0] === '2')
    spy.resetHistory()

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
    stub.callsFake(
      (url: any, query: any, onerror: (...args: any[]) => void) => {
        onerror(url, query)
      }
    )

    agent.pageview(location.href)
    assert(agent.loadTime === 0)
    stub.restore()
  })
})
