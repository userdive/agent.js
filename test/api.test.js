import assert from 'assert'
import { random, internet } from 'faker'

describe('api', () => {
  let api
  before(() => {
    api = require('../src/api')
  })

  it('create', () => {
    assert(api.create(random.uuid(), {baseUrl: internet.url()}))
  })

  it('send', () => {
    api.send('pageviews')
  })

  it('set', () => {
    assert(api.set('key', 'value'))
    assert(api.set({'key': 'value'}))
  })
})
