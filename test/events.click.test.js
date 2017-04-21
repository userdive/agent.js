/* @flow */
import {describe, it, beforeEach} from 'mocha'
import {random} from 'faker'
import {spy as sinonSpy} from 'sinon'
import assert from 'assert'

import EventEmitter from 'events'
import {createEvent} from './helpers/Event'

describe('click', () => {
  const UIEventObserver = require('ui-event-observer').UIEventObserver
  const ClickEvents = require('../src/events/click').default

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
