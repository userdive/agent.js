/* @flow */
import { describe, it } from 'mocha'
import assert from 'power-assert'
import { random } from 'faker'

describe('logger', () => {
  const Logger = require('../src/').default

  it('not setup', () => {
    const Raven = require('raven-js')

    const logger = new Logger(Raven)
    assert(typeof logger.error === 'function')
    logger.error('msg')
  })

  it('ranve-js', () => {
    const Raven = require('raven-js')
    Raven.config(
      `https://${random.alphaNumeric()}@${random.alphaNumeric()}/${random.number()}`
    ).install()
    const logger = new Logger(Raven)
    assert(typeof logger.error === 'function')
    logger.error('msg')
    logger.error(new Error('msg'))
  })
})
