import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import * as Raven from 'raven-js'

import { error, raise, setup, warning } from '../src/logger'

describe('logger', () => {
  const args = [`Logger Test / ${random.word()}`, new Error(random.word())]

  function createDSN () {
    return `https://${random.alphaNumeric()}@${random.alphaNumeric()}/${random.number()}`
  }

  it('raise', () => {
    assert.throws(
      () => raise(random.word()),
      ({ message }: Error) => {
        assert(message)
        return true
      }
    )
  })

  it('not setup', () => {
    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }
  })

  it('setup', () => {
    assert(setup({ Raven }) === false)

    Raven.config(createDSN()).install()
    assert(setup({ Raven }) === true)

    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }
  })
})
