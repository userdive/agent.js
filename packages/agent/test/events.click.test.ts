import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'

import { EventEmitter } from 'events'
import { UIEventObserver } from 'ui-event-observer'
import ClickEvents from '../src/events/click'
import { createEvent } from './helpers/Event'

describe('click', () => {
  let instance: any

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
