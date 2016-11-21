import assert from 'assert'
import { throws } from 'assert-exception'
import { internet, random } from 'faker'

describe.only('store', () => {
  const Store = require('../src/store')

  it('throw', () => {
    assert(throws(() => { return new Store() }).message === 'need id & baseurl')
  })

  it('baseUrl', () => {
    const store = new Store(
      random.alphaNumeric(),
      internet.url()
    )
    assert(store.baseUrl)
  })

  it('merge', () => {
    const store = new Store(
      random.alphaNumeric(),
      internet.url()
    )
    assert(store.merge('undefined', {}) === 'undefined')
  })
})
