/* @flow */
import { describe, it } from 'mocha'
import assert from 'assert'
import { random, internet } from 'faker'
import { stub } from 'sinon'

describe('api', () => {
  const Agent = require('../src/core').default
  const api = require('../src/api').default

  it('create', () => {
    assert(api.create(random.uuid(), {baseUrl: internet.url()}))
  })

  it('send', () => {
    const listen = stub(Agent.prototype, 'listen')
    assert(api.send('pageview') === undefined)
    assert(api.send('pageview') === undefined, 'take2')
    listen.restore()
  })

  it('set', () => {
    assert(api.set('key', 'value'))
    assert(api.set({'key': 'value'}))
  })
})
