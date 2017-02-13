/* @flow */
import { describe, it, afterEach } from 'mocha'
import assert from 'assert'
import { random } from 'faker'

describe('logger', () => {
  const args = [
    random.word(),
    new Error(random.word())
  ]

  afterEach(() => {
    window.Raven = undefined
  })

  it('not setup', () => {
    const error = require('../src/logger').error
    const warning = require('../src/logger').warning

    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }
  })

  it('after setup', () => {
    const error = require('../src/logger').error
    const warning = require('../src/logger').warning
    const Raven = require('raven-js')
    Raven.config(
      `https://${random.alphaNumeric()}@${random.alphaNumeric()}/${random.number()}`
    ).install()

    window.Raven = Raven

    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }
  })
})
