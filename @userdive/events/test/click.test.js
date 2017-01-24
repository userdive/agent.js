/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import assert from 'power-assert'

describe('click', () => {
  const Raven = require('raven-js')
  const mitt = require('mitt')
  const ClickEvents = require('../src/click').default
  const Logger = require('@userdive/logger').default

  let emitter, logger, instance

  beforeEach(() => {
    logger = new Logger(Raven)
    emitter = mitt()
    instance = new ClickEvents(random.word(), emitter, logger, [random.number()])
  })

  it('bind', () => {
    const spy = sinonSpy(instance, 'save')
    instance.bind()

    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)

    assert(spy.calledOnce)
    spy.restore()
  })
})
