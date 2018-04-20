import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'

import { EventEmitter } from 'events'
import { UIEventObserver } from 'ui-event-observer'
import { createEvent, getType } from './helpers/Event'

import Events from '../src/events'
import * as logger from '../src/logger'

describe('events', () => {
  class DummyEvents extends Events {
    public validate () {
      return true
    }
  }

  it('init', () => {
    const instance: any = new DummyEvents(
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
    const events: any = new Events(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    assert.throws(
      () => events.validate(),
      ({ message }: Error) => {
        assert(message === 'please override validate')
        return true
      }
    )

    const handler: any = 'function'
    assert.throws(
      () => events.on('click', handler, getType('click')),
      ({ message }: Error) => {
        assert(message)
        return true
      }
    )
  })

  it('error', () => {
    const events: any = new Events(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    assert(events.error(random.word()) === undefined)
  })

  it('warning', () => {
    const events: any = new Events(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    assert(events.warning(random.word()) === undefined)
  })

  it('emit', () => {
    const instance: any = new DummyEvents(
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
    const handler: any = (e: any) => {
      data = e
    }
    instance.on(eventName, handler, getType(eventName))
    const e = createEvent(eventName)
    window.dispatchEvent(e)
    assert(data)
  })

  it('bind slient error', () => {
    let instance: any = new DummyEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
    const spy = sinonSpy(logger, 'error')
    const error = random.word()
    const eventName = 'click'
    const handler: any = () => {
      throw new Error(error)
    }
    instance.on(eventName, handler, getType(eventName))
    const e = createEvent(eventName)
    window.dispatchEvent(e)

    assert(spy.calledOnce)
    spy.restore()

    class InValidDummyEvents extends DummyEvents {
      public validate () {
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
