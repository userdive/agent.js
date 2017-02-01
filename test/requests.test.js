/* @flow */
import { describe, it } from 'mocha'
import { stub } from 'sinon'
import faker from 'faker/locale/ja'
import assert from 'assert'

describe('requests', () => {
  const requests = require('../src/requests')
  it('doNotTrack', () => {
    const enable = stub(requests, 'enable')
    enable.returns(false)
    assert(requests.get(faker.internet.url(), []) === false)
    enable.restore()
  })

  it('get', () => {
    assert(requests.get(faker.internet.url(), []))
  })

  it('obj2query', () => {
    function isASCII (str: string) {
      return /^[\x00-\x7F]*$/.test(str)
    }
    requests.obj2query({foo: faker.random.word()}).forEach(q => {
      assert(isASCII(q))
    })
  })
})
