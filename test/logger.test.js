/* @flow */
import {describe, it} from 'mocha'
import {random} from 'faker'
import {throws} from 'assert-exception'
import assert from 'assert'

describe('logger', () => {
  const args = [random.word(), new Error(random.word())]

  function createDSN () {
    return `https://${random.alphaNumeric()}@${random.alphaNumeric()}/${random.number()}`
  }

  it('raise', () => {
    const raise = require('../src/logger').raise
    assert(throws(() => raise(random.word())).message)
  })

  it('not setup', () => {
    const error = require('../src/logger').error
    const warning = require('../src/logger').warning
    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }
  })

  it('setup', () => {
    const error = require('../src/logger').error
    const setup = require('../src/logger').setup
    const warning = require('../src/logger').warning

    setup(createDSN(), null)

    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }

    const Raven = require('raven-js')

    setup(createDSN(), Raven)

    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }
  })
})
