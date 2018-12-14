import * as sinon from 'sinon'

import {
  INTERACTION_EMIT_INTERVAL,
  INTERACTION_TYPE_ACTION,
  INTERACTION_TYPE_LOOK,
  MAX_INTERACTION_SEQUENCE
} from '../src/constants'
import InteractionEventEmitter from '../src/interactions'
import { isTouchDevice } from './helpers/browser'
import { createTouchEvent } from './helpers/Event'

const describeExcludeTouch = () => (!isTouchDevice() ? describe.skip : describe)

describeExcludeTouch()('scroll interactions', () => {
  let clock: sinon.SinonFakeTimers
  let target: EventTarget

  let instance: InteractionEventEmitter
  let spyLookEvent: sinon.SinonSpy
  let spyActionEvent: sinon.SinonSpy

  beforeEach(function () {
    clock = sinon.useFakeTimers()
    spyLookEvent = sinon.spy()
    spyActionEvent = sinon.spy()

    instance = new InteractionEventEmitter()
    instance.on(INTERACTION_TYPE_LOOK, spyLookEvent)
    instance.on(INTERACTION_TYPE_ACTION, spyActionEvent)

    target = 'addEventListener' in window ? window : document
    instance.bind(target)
  })

  afterEach(function () {
    instance.unbind()
    clock.restore()
  })

  it('emit look when scroll', () => {
    target.dispatchEvent(createTouchEvent('touchstart', document.createElement('div'), [
      { identifier: 1, pageY: 1, pageX: 1 },
      { identifier: 2, pageY: 2, pageX: 2 }
    ]))

    // Not emitted yet
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.notCalled(spyLookEvent)

    // Emit 1st look
    clock.tick(INTERACTION_EMIT_INTERVAL)
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.calledOnce(spyLookEvent)
    sinon.assert.calledWith(
      spyLookEvent,
      {
        id: 1,
        left: 0,
        top: 0,
        x: 1,
        y: 1,
        type: INTERACTION_TYPE_LOOK
      }
    )

    // Emit 2nd look
    clock.tick(INTERACTION_EMIT_INTERVAL)
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.calledTwice(spyLookEvent)
    sinon.assert.calledWith(
      spyLookEvent,
      {
        id: 2,
        left: 0,
        top: 0,
        x: 1,
        y: 1,
        type: INTERACTION_TYPE_LOOK
      }
    )
  })
})
