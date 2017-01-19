/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'

import { OPTIONS } from '../../src/constants'

describe.skip('click', () => {
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
    const e: any = document.createEvent('MouseEvents')
    e.initEvent('click', true, true)

    function dispatch ({ body }: any) {
      body.dispatchEvent(e)
    }
    dispatch(document)
    assert(spy.called)
  })
})
