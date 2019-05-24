import * as assert from 'assert'
import { EventEmitter } from 'events'

import { random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'
import { UIEventObserver } from 'ui-event-observer'

import { createEvent } from './helpers/Event'

import MouseMoveEvents from '../src/events/mousemove'

describe('mousemove', () => {
  let instance: any

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
