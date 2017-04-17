/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'

import EventEmitter from 'events'
import { UIEventObserver } from 'ui-event-observer'
import { createEvent } from './helpers/Event'

describe('mousemove', () => {
  const MouseMoveEvents = require('../src/events/mousemove').default

  let instance

  beforeEach(() => {
    instance = new MouseMoveEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
  })

  it('validate', () => {
    assert(instance.validate())
  })

  it('on', () => {
    const spy = sinonSpy(instance, 'emit')
    instance.on()

    const e = createEvent('mousemove')
    window.dispatchEvent(e)

    assert(spy.called)
    spy.restore()
  })
})
