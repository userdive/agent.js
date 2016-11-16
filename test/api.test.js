import assert from 'assert'
import { random, internet } from 'faker'

describe('api', () => {
  let api
  before(() => {
    api = require('../src/api')
  })

  it('create', () => {
    assert(api.create(random.uuid(), {}, internet.url()))
  })

  it('send', () => {
    api.send('pageviews')
  })
})
