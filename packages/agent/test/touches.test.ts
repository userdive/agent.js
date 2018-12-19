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

describeExcludeTouch()('touch interactions', () => {
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
    target = 'addEventListener' in window ? window : document.body
    instance.bind(target)
    instance.on(INTERACTION_TYPE_LOOK, spyLookEvent)
    instance.on(INTERACTION_TYPE_ACTION, spyActionEvent)
  })

  afterEach(function () {
    instance.unbind()
    clock.restore()
  })

  it.skip('emit look when touchstart', () => {
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

  it.skip('emit look when touchmove', () => {
    target.dispatchEvent(createTouchEvent('touchmove', document.createElement('div'), [
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

    // Emit last look
    clock.tick(MAX_INTERACTION_SEQUENCE * INTERACTION_EMIT_INTERVAL + INTERACTION_EMIT_INTERVAL)
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.callCount(spyLookEvent, MAX_INTERACTION_SEQUENCE)
    sinon.assert.calledWith(
      spyLookEvent,
      {
        id: MAX_INTERACTION_SEQUENCE,
        left: 0,
        top: 0,
        x: 1,
        y: 1,
        type: INTERACTION_TYPE_LOOK
      }
    )
    sinon.assert.neverCalledWith(
      spyLookEvent,
      {
        id: MAX_INTERACTION_SEQUENCE + 1,
        left: 0,
        top: 0,
        x: 1,
        y: 1,
        type: INTERACTION_TYPE_LOOK
      }
    )
  })

  it.skip('emit action when touchstart and touchend', () => {
    const eventTarget = document.createElement('a')
    target.dispatchEvent(createTouchEvent('touchstart', eventTarget, [
      { identifier: 1, pageY: 1, pageX: 1 },  // Use touchend's value
      { identifier: 2, pageY: 2, pageX: 2 }
    ]))
    target.dispatchEvent(createTouchEvent('touchend', eventTarget, [
      { identifier: 1, pageY: 10, pageX: 10 },  // Use touchend's value
      { identifier: 2, pageY: 20, pageX: 20 }
    ]))

    // Not emitted yet
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.notCalled(spyLookEvent)

    // Emit 1st look
    clock.tick(INTERACTION_EMIT_INTERVAL)
    sinon.assert.calledOnce(spyLookEvent)  // Emit look when touchstart
    sinon.assert.calledOnce(spyActionEvent)
    sinon.assert.calledWith(
      spyActionEvent,
      {
        id: 1,
        left: 0,
        top: 0,
        x: 10,
        y: 10,
        type: INTERACTION_TYPE_ACTION
      }
    )

    // Emit action only once
    clock.tick(MAX_INTERACTION_SEQUENCE * INTERACTION_EMIT_INTERVAL + INTERACTION_EMIT_INTERVAL)
    sinon.assert.callCount(spyActionEvent, 1)
  })

  it.skip('cancel action when touchstart and touchend with touchmove', () => {
    const eventTarget = document.createElement('a')
    target.dispatchEvent(createTouchEvent('touchstart', eventTarget, [
      { identifier: 1, pageY: 1, pageX: 1 },
      { identifier: 2, pageY: 2, pageX: 2 }
    ]))
    target.dispatchEvent(createTouchEvent('touchmove', eventTarget, [
      { identifier: 1, pageY: 1, pageX: 1 },
      { identifier: 2, pageY: 2, pageX: 2 }
    ]))
    target.dispatchEvent(createTouchEvent('touchend', eventTarget, [
      { identifier: 1, pageY: 1, pageX: 1 },
      { identifier: 2, pageY: 2, pageX: 2 }
    ]))

    // Not emitted yet
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.notCalled(spyLookEvent)

    // Emit 1st look
    clock.tick(INTERACTION_EMIT_INTERVAL)
    sinon.assert.calledOnce(spyLookEvent)  // Emit look when touchstart
    sinon.assert.notCalled(spyActionEvent)
  })
})
