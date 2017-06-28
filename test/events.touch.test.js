/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'

import EventEmitter from 'events'
import { isTouchDevice } from './helpers/browser'

function describeExcludeTouch (): Function {
  return !isTouchDevice() ? describe.skip : describe
}

describeExcludeTouch()('touch', () => {
  const { UIEventObserver } = require('ui-event-observer')
  const TouchEvents = require('../src/events/touch').default

  let instance

  beforeEach(() => {
    instance = new TouchEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
  })

  it('validate', () => {
    assert(instance.validate())
  })

  it('dispatch', () => {
    const spy = sinonSpy(instance, 'emit')
    const e: any = {
      touches: [{ pageX: random.number(), pageY: random.number() }]
    }
    assert(instance.dispatch(e) === undefined)
    assert(spy.called)
    spy.restore()
  })
})
