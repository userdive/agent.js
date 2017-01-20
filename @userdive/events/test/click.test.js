/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { spy as sinonSpy } from 'sinon'
import assert from 'power-assert'

describe.skip('click', () => {
  const Raven = require('raven-js')
  const EventEmitter = require('events').EventEmitter
  const ClickEvents = require('../src/click').default
  const Logger = require('@userdive/logger').default
  const NAME = require('../src/base').NAME

  let emitter, logger, instance, spy

  beforeEach(() => {
    spy = sinonSpy()
    logger = new Logger(Raven)
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
