/* @flow */
import { describe, it } from 'mocha'
import assert from 'assert'
import { random } from 'faker'

describe('logger', () => {
  const Logger = require('../src/logger').default
  const args = [
    random.word(),
    new Error(random.word())
  ]

  it('not setup', () => {
    const Raven = require('raven-js')
    const logger = new Logger(Raven)

    for (let i = 0; i < args.length; i++) {
      assert(logger.capture(args[i]) === undefined)
      assert(logger.error(args[i]) === undefined)
      assert(logger.warning(args[i]) === undefined)
    }
  })

  it('after setup', () => {
    const Raven = require('raven-js')
    Raven.config(
      `https://${random.alphaNumeric()}@${random.alphaNumeric()}/${random.number()}`
    ).install()

    const logger = new Logger(Raven)
    for (let i = 0; i < args.length; i++) {
      assert(logger.capture(args[i]) === undefined)
      assert(logger.error(args[i]) === undefined)
      assert(logger.warning(args[i]) === undefined)
    }
  })
})
