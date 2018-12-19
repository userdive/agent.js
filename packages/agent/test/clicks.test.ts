import * as sinon from 'sinon'

import {
  INTERACTION_EMIT_INTERVAL,
  INTERACTION_TYPE_ACTION,
  INTERACTION_TYPE_LOOK,
  MAX_INTERACTION_SEQUENCE
} from '../src/constants'
import InteractionEventEmitter from '../src/interactions'
import { createMouseEvent } from './helpers/Event'

describe('mouse clicks', () => {
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

  it.skip('emit action when click', () => {
    target.dispatchEvent(createMouseEvent('click', 0, 0, 1, 1))

    // Not emitted yet
    sinon.assert.notCalled(spyActionEvent)
    sinon.assert.notCalled(spyLookEvent)

    // Emit 1st look
    clock.tick(INTERACTION_EMIT_INTERVAL)
    sinon.assert.calledOnce(spyLookEvent)  // Emit look when mousedown
    sinon.assert.calledOnce(spyActionEvent)
    sinon.assert.calledWith(
      spyActionEvent,
      {
        id: 1,
        left: 0,
        top: 0,
        x: 1,
        y: 1,
        type: INTERACTION_TYPE_ACTION
      }
    )

    // Emit action only once
    clock.tick(MAX_INTERACTION_SEQUENCE * INTERACTION_EMIT_INTERVAL + INTERACTION_EMIT_INTERVAL)
    sinon.assert.callCount(spyActionEvent, 1)
  })
})
