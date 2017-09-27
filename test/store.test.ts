/* @flow */
import { describe, it } from 'mocha'
import assert from 'assert'
import { internet, random } from 'faker'
import { CUSTOM_INDEX } from '../src/constants'

describe('store', () => {
  const Store = require('../src/store').default

  function createInstance () {
    return new Store()
  }

  it('merge', () => {
    const store = createInstance()
    const env = {
      v: random.number(),
      uid: random.number(),
      l: internet.url(),
      n: random.word(),
      r: internet.url(),
      sw: random.number(),
      sh: random.number(),
      ww: random.number(),
      wh: random.number(),
      h: random.number(),
      w: random.number()
    }
    assert(
      store.merge({
        type: 'env',
        data: env
      }).env.v === env.v
    )
    const before = env.uid
    delete env.uid
    assert(store.merge({ type: 'env', data: env }).env.uid === before)
  })

  it('set', () => {
    const url = internet.url()
    const store = createInstance()
    const state = store.set('page', url)
    assert(state.env.l === url)

    for (let i = 1; i <= CUSTOM_INDEX + 1; i++) {
      const dimention: any = `dimension${i}`
      const metric: any = `metric${i}`
      store.set(dimention, random.alphaNumeric())
      store.set(metric, random.number({ min: 1, max: 99 }))
    }
    for (let i = 1; i <= CUSTOM_INDEX; i++) {
      assert(store._state.custom[`cd${i}`])
      assert(store._state.custom[`cm${i}`])
    }
    assert(store._state.custom[`cd${CUSTOM_INDEX + 1}`] === undefined)
    assert(store._state.custom[`cm${CUSTOM_INDEX + 1}`] === undefined)
  })

  it('mergeDeep', () => {
    const url = internet.url()
    const store = createInstance()

    const state = store.mergeDeep({
      dimension1: random.alphaNumeric(),
      dimension2: random.alphaNumeric(),
      dimension3: random.alphaNumeric(),
      dimension4: random.alphaNumeric(),
      dimension5: random.alphaNumeric(),
      metric1: random.number({ min: 1, max: 99 }),
      metric2: random.number({ min: 1, max: 99 }),
      metric3: random.number({ min: 1, max: 99 }),
      metric4: random.number({ min: 1, max: 99 }),
      metric5: random.number({ min: 1, max: 99 }),
      page: url,
      undefined: random.word() // useless
    })
    assert(state.env.l === url)
    assert(Object.keys(state.custom).length === 10)
  })

  it('get', () => {
    const store = createInstance()
    assert(store.get('env'))
    assert(store.get('custom'))
  })
})
