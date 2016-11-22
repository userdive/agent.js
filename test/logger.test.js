import assert from 'assert'
import { spy } from 'sinon'
import { random } from 'faker'

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
    window[window.USERDIVEObject] = undefined
    window.USERDIVEObject = undefined
    captureMessage.restore()
    captureException.restore()
  })

  it('undefined', () => {
    logger.captureException(new Error())
    assert(captureException.called === false)
    logger.captureMessage(random.word())
    assert(captureMessage.called === false)

    window.USERDIVEObject = random.word()
    window[window.USERDIVEObject] = function () {}

    logger.captureException(new Error())
    assert(captureException.called === false)
    logger.captureMessage(random.word())
    assert(captureMessage.called === false)
  })

  it('defined', () => {
    window.USERDIVEObject = random.word()
    window[window.USERDIVEObject] = function () {}
    window[window.USERDIVEObject].Raven = Raven

    logger.captureException(new Error())
    assert(captureException.called === false)
    logger.captureMessage(random.word())
    assert(captureMessage.called === false)

    window[window.USERDIVEObject].Raven.config(
      `https://${random.alphaNumeric()}@${random.alphaNumeric()}/${random.number()}`
    ).install()

    logger.captureException(new Error())
    assert(captureException.called)
    logger.captureMessage(random.word())
    assert(captureMessage.called)
  })
})
