import 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import * as assert from 'assert'

import { EventEmitter } from 'events'
import { createEvent } from './helpers/Event'
import { UIEventObserver } from 'ui-event-observer'
import ClickEvents from '../src/events/click'

describe('click', () => {
  let instance

  beforeEach(() => {
    instance = new ClickEvents(
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

    const e = createEvent('click')
    window.dispatchEvent(e)

    assert(spy.called)
    spy.restore()
  })
})
