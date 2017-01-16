/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'
import { OPTIONS, POINT } from '../src/constants'

describe('events', () => {
  const Events = require('../src/events').default
  const EventEmitter = require('events').EventEmitter
  const Logger = require('../src/logger').default

  let emitter, instance, spy, logger

  beforeEach(() => {
    spy = sinonSpy()
    emitter = new EventEmitter()
    emitter.on(POINT, spy)
    logger = new Logger(OPTIONS.Raven)

    instance = new Events(emitter, logger)
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
