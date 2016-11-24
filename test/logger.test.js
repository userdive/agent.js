import assert from 'assert'
import { spy } from 'sinon'
import { random } from 'faker'

import { GLOBAL } from '../src/constants'

describe('logger', () => {
  const Raven = require('raven-js')
  const logger = require('../src/logger')
  let captureException
  let captureMessage

  beforeEach(() => {
    captureMessage = spy(Raven, 'captureMessage')
    captureException = spy(Raven, 'captureException')
  })

  afterEach(() => {
    window[window[GLOBAL]] = undefined
    window[GLOBAL] = undefined
    captureMessage.restore()
    captureException.restore()
  })

  it('undefined', () => {
    logger.error(new Error())
    assert(captureException.called === false)
    logger.error(random.word())
    assert(captureMessage.called === false)

    window[GLOBAL] = random.word()
    window[window[GLOBAL]] = function () {}

    logger.error(new Error())
    assert(captureException.called === false)
    logger.error(random.word())
    assert(captureMessage.called === false)
  })

  it('defined', () => {
    window[GLOBAL] = random.word()
    window[window[GLOBAL]] = function () {}
    window[window[GLOBAL]].Raven = Raven

    logger.error(new Error())
    assert(captureException.called === false)
    logger.error(random.word())
    assert(captureMessage.called === false)

    window[window[GLOBAL]].Raven.config(
      `https://${random.alphaNumeric()}@${random.alphaNumeric()}/${random.number()}`
    ).install()

    logger.error(new Error())
    assert(captureException.called)
    logger.error(random.word())
    assert(captureMessage.called)
  })
})
