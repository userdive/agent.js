import * as assert from 'power-assert'

describe('api test', function () {
  it('load test', function () {
    assert(require('../src/api'))
  })
})
