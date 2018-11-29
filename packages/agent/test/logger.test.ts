import { captureException, captureMessage } from '@sentry/browser'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'

import { SETTINGS } from '../src/constants'
import { error, raise, setup, warning } from '../src/logger'

describe('logger', () => {
  const args = [`Logger Test / ${random.word()}`, new Error(random.word())]

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
    setup({
      ...SETTINGS,
      captureException,
      captureMessage
    })
    for (let i = 0; i < args.length; i++) {
      assert(error(args[i]) === undefined)
      assert(warning(args[i]) === undefined)
    }
  })
})
