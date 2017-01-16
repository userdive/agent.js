/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'

import { OPTIONS, POINT } from '../../src/constants'

describe('click', () => {
  const EventEmitter = require('events').EventEmitter
  const ClickEvents = require('../../src/events/click').default
  const Logger = require('../../src/logger').default

  let emitter, logger, instance, spy

  beforeEach(() => {
    spy = sinonSpy()
    logger = new Logger(OPTIONS.Raven)
    emitter = new EventEmitter()
    emitter.on(POINT, spy)
    instance = new ClickEvents(emitter, logger)
  })

  afterEach(() => {
    spy.reset()
  })

  it('bind', () => {
    instance.bind()
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)
    assert(spy.called)
  })
})
