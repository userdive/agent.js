/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'

import { OPTIONS } from '../../src/constants'

describe('click', () => {
  const EventEmitter = require('events').EventEmitter
  const ClickEvents = require('../../src/events/click').default
  const Logger = require('../../src/logger').default
  const NAME = require('../../src/events').NAME

  let emitter, logger, instance, spy

  beforeEach(() => {
    spy = sinonSpy()
    logger = new Logger(OPTIONS.Raven)
    emitter = new EventEmitter()
    instance = new ClickEvents(emitter, logger)
    emitter.on(NAME, spy)
  })

  afterEach(() => {
    spy.reset()
  })

  it('bind', () => {
    instance.bind()
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', true, true)
    document.body.dispatchEvent(e)
    assert(spy.called)
  })
})
