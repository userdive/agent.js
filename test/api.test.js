/* @flow */
import { describe, it, before } from 'mocha'
import assert from 'assert'
import { random, internet } from 'faker'

describe('api', () => {
  let api
  before(() => {
    api = require('../src/api').default
  })

  it('create', () => {
    assert(api.create(random.uuid(), {baseUrl: internet.url()}))
  })

  it('send', () => {
    api.send('pageview')
  })

  it('set', () => {
    assert(api.set('key', 'value'))
    assert(api.set({'key': 'value'}))
  })
})
