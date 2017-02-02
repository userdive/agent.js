/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'

describe('scroll', () => {
  const Raven = require('raven-js')
  const mitt = require('mitt')
  const ScrollEvents = require('../src/events/scroll').default
  const Logger = require('../src/logger').default

  let emitter, logger, instance

  beforeEach(() => {
    logger = new Logger(Raven)
    emitter = mitt()
    instance = new ScrollEvents(random.word(), emitter, logger)
  })

  it('validate', () => {
    assert(instance.validate())
  })

  it.skip('on', () => {
    const spy = sinonSpy(instance, 'emit')
    instance.on()

    window.dispatchEvent(new Event('scroll'))

    assert(spy.called)
    spy.restore()
  })
})
