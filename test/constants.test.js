/* @flow */
import { describe, it } from 'mocha'
import assert from 'assert'

describe('constants', () => {
  it('raven interface', () => {
    const {
      isSetup,
      captureMessage,
      captureException
    } = require('../src/constants').OPTIONS.Raven

    assert(isSetup() === false)
    captureException(new Error('error'))
    captureMessage('error')
  })
})
