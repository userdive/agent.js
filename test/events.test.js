/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { spy as sinonSpy } from 'sinon'
import { random } from 'faker'
import { throws } from 'assert-exception'
import assert from 'assert'

import mitt from 'mitt'
import Raven from 'raven-js'

describe('events', () => {
  const Events = require('../src/events').default
  const Logger = require('../src/logger').default

  let emitter, logger

  class DummyEvents extends Events {
    validate () {
      return true
    }
  }

  beforeEach(() => {
    emitter = mitt()
    logger = new Logger(Raven)
  })

  it('init', () => {
    const instance = new DummyEvents(random.word(), emitter, logger, [random.number()])
    assert(instance.emit)
    assert(instance.validate)
    assert(instance.on)
    assert(instance.off)
  })

  it('must override func', () => {
    const events = new Events(random.word(), emitter, logger, [random.number()])
    assert(throws(() => {
      events.validate()
    }).message === 'please override validate')

    const handler: any = 'function'
    assert(throws(() => {
      events.on(window, 'click', handler)
    }).message)
  })

  it('emit', () => {
    const instance = new DummyEvents(random.word(), emitter, logger, [random.number()])
    instance.emit({x: random.number(), y: random.number()})
    instance.emit({x: -1, y: -1})
  })

  it('on', () => {
    const instance = new DummyEvents(random.word(), emitter, logger, [random.number()])

    let data

    instance.on(document, 'click', (e) => { data = e })
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)
    assert(data)
  })

  it('bind slient error', () => {
    let instance = new DummyEvents(random.word(), emitter, logger, [random.number()])
    const spy = sinonSpy(logger, 'error')
    const error = random.word()
    instance.on(document, 'click', (e) => { throw new Error(error) })
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)

    assert(logger.error.calledOnce)
    spy.restore()

    class InValidDummyEvents extends DummyEvents {
      validate () {
        return false
      }
    }

    instance = new InValidDummyEvents(random.word(), emitter, logger, [random.number()])
    instance.on(document, 'click', (e) => { throw new Error(error) })
  })

  it('off', () => {
    const instance = new Events(random.word(), emitter, logger, [random.number()])
    instance.off()
  })
})
