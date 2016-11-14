import assert from 'assert'

describe('index', () => {
  let api
  before(() => {
    api = require('../src')
  })

  it('404 global', () => {
    assert(typeof api.create === 'function')
    assert(typeof api.send === 'function')
  })
})
