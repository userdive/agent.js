/* @flow */
import { describe, it } from 'mocha'
import assert from 'assert'
import { internet, random } from 'faker'

describe('store', () => {
  const Store = require('../src/store').default

  it('merge env', () => {
    const store = new Store(
      random.alphaNumeric(),
      internet.url(),
      random.alphaNumeric()
    )
    const v = random.number()
    assert(store.merge('env', {v}).env.v === v)
    assert(store.merge('env', {}).env.v === v)
    assert(store.baseUrl)
  })

  it('set', () => {
    const url = internet.url()
    const store = new Store(
      random.alphaNumeric(),
      internet.url(),
      random.alphaNumeric()
    )
    const state = store.set('page', url)
    assert(state.env.l === url)

    store.set(`dimension1`, random.alphaNumeric())
    store.set(`dimension2`, random.alphaNumeric())
    store.set(`dimension3`, random.alphaNumeric())
    store.set(`dimension4`, random.alphaNumeric())
    store.set(`dimension5`, random.alphaNumeric())
    store.set(`metric1`, random.number({min: 1, max: 99}))
    store.set(`metric2`, random.number({min: 1, max: 99}))
    store.set(`metric3`, random.number({min: 1, max: 99}))
    store.set(`metric4`, random.number({min: 1, max: 99}))
    store.set(`metric5`, random.number({min: 1, max: 99}))
    for (let i = 1; i <= 5; i++) {
      assert(store.state.custom[`cd${i}`])
      assert(store.state.custom[`cm${i}`])
    }
  })

  it('map', () => {
    const url = internet.url()
    const store = new Store(
      random.alphaNumeric(),
      internet.url(),
      random.alphaNumeric()
    )
    const state = store.map({
      'dimension1': random.alphaNumeric(),
      'dimension2': random.alphaNumeric(),
      'dimension3': random.alphaNumeric(),
      'dimension4': random.alphaNumeric(),
      'dimension5': random.alphaNumeric(),
      'metric1': random.number({min: 1, max: 99}),
      'metric2': random.number({min: 1, max: 99}),
      'metric3': random.number({min: 1, max: 99}),
      'metric4': random.number({min: 1, max: 99}),
      'metric5': random.number({min: 1, max: 99}),
      'page': url,
      'undefined': random.word() // useless
    })
    assert(state.env.l === url)
    assert(Object.keys(state.custom).length === 10)
  })
})
