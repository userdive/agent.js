/* @flow */
import { describe, it } from 'mocha'
import { spy as sinonSpy } from 'sinon'
import { random } from 'faker'
import { throws } from 'assert-exception'
import assert from 'assert'

import EventEmitter from 'events'
import { UIEventObserver } from 'ui-event-observer'
import { createEvent, getType } from './helpers/Event'

describe('events', () => {
  const logger: any = require('../src/logger')
  const Events = require('../src/events').default

  class DummyEvents extends Events {
    validate () {
      return true
    }
  }

  it('init', () => {
    const instance = new DummyEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    assert(instance.emitter)
    assert(instance.observer)
    assert(typeof instance.name === 'string')
    assert(typeof instance.off === 'function')
    assert(typeof instance.on === 'function')
    assert(typeof instance.validate === 'function')
  })

  it('must override func', () => {
    const events = new Events(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    assert(
      throws(() => {
        events.validate()
      }).message === 'please override validate'
    )

    const handler: any = 'function'
    assert(
      throws(() => {
        events.on('click', handler, getType('click'))
      }).message
    )
  })

  it('error', () => {
    const events = new Events(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    assert(events.error(random.word()) === undefined)
  })

  it('warning', () => {
    const events = new Events(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    assert(events.warning(random.word()) === undefined)
  })

  it('emit', () => {
    const instance = new DummyEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    instance.emit({ x: random.number(), y: random.number() })
    instance.emit({ x: -1, y: -1 })
  })

  it('on', () => {
    const instance = new DummyEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )

    let data

    const eventName = 'click'
    const handler: any = e => {
      data = e
    }
    instance.on(eventName, handler, getType(eventName))
    const e = createEvent(eventName)
    window.dispatchEvent(e)
    assert(data)
  })

  it('bind slient error', () => {
    let instance = new DummyEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    const spy = sinonSpy(logger, 'error')
    const error = random.word()
    const eventName = 'click'
    const handler: any = e => {
      throw new Error(error)
    }
    instance.on(eventName, handler, getType(eventName))
    const e = createEvent(eventName)
    window.dispatchEvent(e)

    assert(logger.error.calledOnce)
    spy.restore()

    class InValidDummyEvents extends DummyEvents {
      validate () {
        return false
      }
    }

    instance = new InValidDummyEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    instance.on('click', handler, getType('click'))
  })

  it('off', () => {
    const instance = new Events(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    instance.off()
  })
})
