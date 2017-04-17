/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { spy as sinonSpy, useFakeTimers } from 'sinon'
import { random } from 'faker'
import { throws } from 'assert-exception'
import isUrl from 'is-url'
import assert from 'assert'
import EventEmitter from 'events'
import {
  SETTINGS as SETTINGS_DEFAULT
} from '../src/constants'

function toMin (msec: number): number {
  return msec * 1000 * 60
}

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
        emitter.on('test', data => super.emit(data))
      }
    }
  }

  function agentFactory (options = {}) {
    return new Agent(
      random.uuid(),
      [
        eventFactory('click', emitter),
        eventFactory('scroll', emitter)
      ],
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
    assert(throws(() => { agent.listen() }).message === 'need send pageview')

    agent.active = true

    assert(throws(() => { agent.listen() }).message === 'need send pageview')
  })

  it('send failed', () => {
    agent.send('pageview', location.href)
    const spy = sinonSpy(require('../src/requests'), 'get')

    emitter.emit('test', {
      x: -1,
      y: -1
    })
    timer.tick(toMin(30 * 60))

    assert(spy.called === false)

    spy.restore()
  })

  it('send success', () => {
    agent.send('pageview', location.href)

    const spy = sinonSpy(require('../src/requests'), 'get')

    emitter.emit('test', {
      x: random.number({min: 1}),
      y: random.number({min: 1})
    })

    timer.tick(toMin(1))

    agent.destroy()

    const url = spy.getCall(0).args[0]
    assert(url.split('/').length === 7)
    assert(url.split('/')[4].length === 32)
    assert(url.split('/')[5].length === 13)
    assert(url.split('/')[6] === 'int.gif')
    assert(isUrl(url))

    assert(spy.getCall(0).args[1].length === 2)
    assert(spy.getCall(0).args[1][1].split(',').length === 6)

    spy.restore()
  })

  it('send success auto', () => {
    const spy = sinonSpy(require('../src/requests'), 'get')
    const autoAgent = agentFactory({auto: true})
    autoAgent.send('pageview', location.href)
    const url = spy.getCall(0).args[0]
    assert(url.split('/').length === 7)
    assert(url.split('/')[4].length === 32)
    assert(url.split('/')[5].length === 13)
    assert(url.split('/')[6] === 'env.gif')
  })
})
