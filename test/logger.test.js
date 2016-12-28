import assert from 'assert'
import { spy } from 'sinon'
import { random } from 'faker'

import { GLOBAL } from '../src/constants'

describe('logger', () => {
  const Raven = require('raven-js')
  const error = require('../src/logger').error
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
    error(new Error())
    assert(captureException.called === false)
    error(random.word())
    assert(captureMessage.called === false)

    window[GLOBAL] = random.word()
    window[window[GLOBAL]] = function () {}

    error(new Error())
    assert(captureException.called === false)
    error(random.word())
    assert(captureMessage.called === false)
  })

  it('defined', () => {
    window[GLOBAL] = random.word()
    window[window[GLOBAL]] = function () {}
    window[window[GLOBAL]].Raven = Raven

    error(new Error())
    assert(captureException.called === false)
    error(random.word())
    assert(captureMessage.called === false)

    window[window[GLOBAL]].Raven.config(
      `https://${random.alphaNumeric()}@${random.alphaNumeric()}/${random.number()}`
    ).install()

    error(new Error())
    assert(captureException.called)
    error(random.word())
    assert(captureMessage.called)
  })
})
