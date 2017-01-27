/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { useFakeTimers } from 'sinon'
import { random, internet } from 'faker'
import { throws } from 'assert-exception'
import assert from 'assert'

describe('core', () => {
  const Agent = require('../src/core').default
  const Base = require('../src/events').default
  const Raven = require('../src/constants').OPTIONS.Raven
  const mitt = require('mitt')

  let agent, emitter, timer
  beforeEach(() => {
    emitter = mitt()
    timer = useFakeTimers(new Date().getTime())

    class DummyEvents extends Base {
      validate () {
        return true
      }
      on () {
        super.on(document.body, 'click', () => {})
        emitter.on('test', data => {
          super.emit(data)
        })
      }
    }

    agent = new Agent(
      random.alphaNumeric(),
      [
        DummyEvents
      ],
      {
        baseUrl: internet.url(),
        cookieName: random.alphaNumeric(),
        cookieDomain: random.alphaNumeric(),
        cookieExpires: 0,
        Raven: Raven
      }
    )
  })

  afterEach(() => {
    timer.restore()
    agent.destroy()
  })

  it('instance', () => {
    assert(agent)
  })

  it('listen before send pageview', () => {
    assert(agent.listen() === undefined, 'nothing todo when before load')
    agent.loaded = true

    agent.listen()

    emitter.emit('test', {
      x: random.number({min: 1}),
      y: random.number({min: 1})
    })
    assert(throws(() => { timer.tick(10 * 1000) }).message === 'need load time')
  })

  it('send', () => {
    agent.send('pageview', location.pathname)

    emitter.emit('test', {
      x: random.number({min: 1}),
      y: random.number({min: 1})
    })
    timer.tick(10 * 1000)
  })
})
