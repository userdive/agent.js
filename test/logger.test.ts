import 'mocha'
import * as assert from 'assert'
import { random } from 'faker'
import { throws } from 'assert-exception'
import { error, setup, warning } from '../src/logger'

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
    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }
  })

  it('setup', () => {
    setup(createDSN())

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
