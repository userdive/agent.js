import * as sinon from 'sinon'

import {
  INTERACTION_EMIT_INTERVAL,
  INTERACTION_TYPE_ACTION,
  INTERACTION_TYPE_LOOK,
  MAX_INTERACTION_SEQUENCE
} from '../src/constants'
import InteractionEventEmitter from '../src/interactions'
import { isPointerDevice } from './helpers/browser'
import { createPointerEvent } from './helpers/Event'

const describeExcludeTouch = () => (!isPointerDevice() ? describe.skip : describe)

describeExcludeTouch()('pointer interactions', () => {
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

  it.skip('emit look when pointerdown', () => {
    target.dispatchEvent(createPointerEvent('pointerdown', 0, 0, 1, 1))

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

  it.skip('emit look when pointermove', () => {
    target.dispatchEvent(createPointerEvent('pointermove', 0, 0, 1, 1))

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

  it.skip('emit action when pointerdown and pointerup', () => {
    target.dispatchEvent(createPointerEvent('pointerdown', 0, 0, 1, 1))
    target.dispatchEvent(createPointerEvent('pointerup', 0, 0, 10, 10))

    // Not emitted yet
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.notCalled(spyLookEvent)

    // Emit 1st look
    clock.tick(INTERACTION_EMIT_INTERVAL)
    sinon.assert.calledOnce(spyLookEvent)  // Emit look when pointerdown
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

  it.skip('cancel action when pointerdown and pointerup with pointermove', () => {
    target.dispatchEvent(createPointerEvent('pointerdown', 0, 0, 1, 1))
    target.dispatchEvent(createPointerEvent('pointermove', 0, 0, 2, 2))
    target.dispatchEvent(createPointerEvent('pointerup', 0, 0, 3, 3))

    // Not emitted yet
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.notCalled(spyLookEvent)

    // Emit 1st look
    clock.tick(INTERACTION_EMIT_INTERVAL)
    sinon.assert.calledOnce(spyLookEvent)  // Emit look when pointerdown
    sinon.assert.notCalled(spyActionEvent)
  })
})
