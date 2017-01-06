/* @flow */
import { describe, it } from 'mocha'
import assert from 'assert'
import { random, internet } from 'faker'

describe('api', () => {
  const api = require('../src/api').default
  it('send when before create', () => {
    assert(api.send('pageview') === undefined)
  })

  it('create', () => {
    assert(api.create(random.uuid(), {baseUrl: internet.url()}))
  })

  it('send', () => {
    assert(api.send('pageview') === undefined)
  })

  it('send take2', () => {
    assert(api.send('pageview') === undefined)
  })

  it('set', () => {
    assert(api.set('key', 'value'))
    assert(api.set({'key': 'value'}))
  })
})
