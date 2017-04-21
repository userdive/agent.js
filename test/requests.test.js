/* @flow */
import {describe, it} from 'mocha'
import {internet, random} from 'faker/locale/ja'
import assert from 'assert'

describe('requests', () => {
  const requests = require('../src/requests')

  it('get', () => {
    assert(requests.get(internet.url(), []) === undefined)
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
