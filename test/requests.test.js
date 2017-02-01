/* @flow */
import { describe, it } from 'mocha'
import { stub } from 'sinon'
import { internet, random } from 'faker/locale/ja'
import assert from 'assert'

describe('requests', () => {
  const requests = require('../src/requests')
  it.skip('doNotTrack', () => {
    const enable = stub(requests, 'enable')
    enable.returns(false)
    assert(requests.get(internet.url(), []) === false)
    enable.restore()
  })

  it('get', () => {
    assert(requests.get(internet.url(), []))
  })

  it('obj2query', () => {
    function isASCII (str: string) {
      return /^[\x00-\x7F]*$/.test(str)
    }
    requests.obj2query({foo: random.word()}).forEach(q => {
      assert(isASCII(q))
    })
  })
})
