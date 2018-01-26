import * as assert from 'assert'
import 'mocha'

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
