/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { spy as sinonSpy } from 'sinon'
import { random } from 'faker'
import { throws } from 'assert-exception'
import assert from 'power-assert'

describe('events', () => {
  const events = require('../src/base')
  const Events = events.default

  const mitt = require('mitt')

  const Raven = require('raven-js')
  const Logger = require('@userdive/logger').default

  let emitter, instance, logger

  beforeEach(() => {
    emitter = mitt()
    logger = new Logger(Raven)
    class DummyEvents extends Events {
      validate () {
        return true
      }
    }
    instance = new DummyEvents(random.word(), emitter, logger, [random.number()])
  })

  it('init', () => {
    assert(instance.save)
    assert(instance.bind)
    assert(instance.unbind)
  })

  it('must override func', () => {
    const events = new Events(random.word(), emitter, logger, [random.number()])
    assert(throws(() => {
      events.validate()
    }).message === 'please override validate')
  })

  it('save', () => {
    instance.save({x: random.number(), y: random.number()})
    instance.save({x: -1, y: -1})
  })

  it('bind', () => {
    let data
    instance.bind(document, 'click', (e) => { data = e })
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)
    assert(data)
  })

  it('error', () => {
    const spy = sinonSpy(logger, 'error')
    const error = random.word()
    instance.bind(document, 'click', (e) => { throw new Error(error) })
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)

    assert(logger.error.calledOnce)
    spy.restore()
  })

  it('unbind', () => {
    instance.unbind()
  })
})
