/* @flow */
import { describe, it, beforeEach } from 'mocha'
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
    instance = new ClickEvents(emitter, logger)
  })

  it('bind', () => {
    assert(instance.data === undefined)
    instance.bind()

    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)

    assert(instance.data)
  })
})
