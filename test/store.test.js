import assert from 'assert'

describe('store', () => {
  const Store = require('../src/store')
  it('baseUrl', () => {
    const store = new Store()
    assert(store.baseUrl)
  })

  it('merge', () => {
    const store = new Store()
    assert(store.merge('undefined', {}))
  })
})
