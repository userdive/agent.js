/* @flow */
import { describe, it } from 'mocha'
import faker from 'faker/locale/ja'
import assert from 'assert'

describe('requests', () => {
  const get = require('../src/requests').get
  const obj2query = require('../src/requests').obj2query

  it('get', () => {
    assert(get(faker.internet.url(), []))
  })

  it('doNotTrack', () => {
    navigator.doNotTrack = '1'
    assert(get(faker.internet.url(), []) === false)
    navigator.doNotTrack = undefined
  })

  it('obj2query', () => {
    function isASCII (str: string) {
      return /^[\x00-\x7F]*$/.test(str)
    }
    obj2query({foo: faker.random.word()}).forEach(q => {
      assert(isASCII(q))
    })
  })
})
