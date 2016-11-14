import assert from 'assert'

describe('api', () => {
  let api
  before(() => {
    api = require('../src/api')
  })

  it('create', () => {
    assert(typeof api.create === 'function')
  })

  it('send', () => {
    assert(typeof api.send === 'function')
  })
})
