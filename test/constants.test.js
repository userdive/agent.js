/* @flow */
import { describe, it } from 'mocha'
import assert from 'assert'

describe('constants', () => {
  it('INTERVAL', () => {
    const { INTERVAL } = require('../src/constants')

    let sum = 0
    INTERVAL.forEach(n => {
      sum += n
    })
    assert(sum === 10 * 60, '10 min')
  })
})
