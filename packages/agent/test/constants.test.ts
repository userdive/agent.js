import * as assert from 'assert'

import 'mocha'
import { INTERVAL } from '../src/constants'

describe('constants', () => {
  it('INTERVAL', () => {
    let sum = 0
    INTERVAL.forEach((n: number) => {
      sum += n
    })
    assert(sum === 10 * 60, '10 min')
  })
})
