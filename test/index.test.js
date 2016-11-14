import assert from 'assert'

describe('index', () => {
  let Api
  before(() => {
    Api = require('../src')
  })

  it('404 global', () => {
    const api = new Api()
    assert(typeof api.create === 'function')
    assert(typeof api.send === 'function')
  })
})
