/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import assert from 'power-assert'

describe('events', () => {
  const events = require('../src/base')
  const Events = events.default
  const NAME = events.NAME

  const EventEmitter = require('events').EventEmitter

  const Raven = require('raven-js')
  const Logger = require('@userdive/logger').default

  let emitter, instance, spy, logger

  beforeEach(() => {
    spy = sinonSpy()
    emitter = new EventEmitter()
    logger = new Logger(Raven)
    instance = new Events(emitter, logger)
    emitter.on(NAME, spy)
  })

  afterEach(() => {
    spy.reset()
  })

  it('init', () => {
    assert(instance.change)
    assert(instance.bind)
    assert(instance.unbind)
  })

  it('change', () => {
    instance.change({x: random.number(), y: random.number()})
    assert(spy.called)
  })

  it('bind', () => {
    let data
    instance.bind(document, 'click', (e) => { data = e })
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)
    assert(data)
  })

  it('error', () => {
    sinonSpy(logger, 'error')
    const error = random.word()
    instance.bind(document, 'click', (e) => { throw new Error(error) })
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)

    assert(logger.error.calledOnce)
  })

  it('unbind', () => {
    instance.unbind()
  })
})
