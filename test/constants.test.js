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

  it('INTERVAL', () => {
    const { INTERVAL } = require('../src/constants')

    assert(INTERVAL[0] === 0)

    let sum = 0
    INTERVAL.forEach(n => {
      sum += n
    })
    assert(sum === 30 * 60, '30 min')
  })
})
