import assert from 'assert'

describe('store', () => {
  it('getEnv', () => {
    const getEnv = require('../src/store').getEnv
    assert(getEnv())
  })

  it('getBaseUrl', () => {
    const getBaseUrl = require('../src/store').getBaseUrl
    assert(getBaseUrl())
  })
})
