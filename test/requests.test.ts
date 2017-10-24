import 'mocha'
import { internet, random } from 'faker/locale/ja'
import * as assert from 'assert'

describe('requests', () => {
  const requests = require('../src/requests')
  const dummyHandler = () => {
    // nothing to do
  }

  it('get', () => {
    assert(requests.get(internet.url(), [], dummyHandler, dummyHandler) === undefined)
  })

  it('obj2query', () => {
    function isASCII (str: string) {
      return /^[\x00-\x7F]*$/.test(str)
    }
    requests.obj2query({ foo: random.word() }).forEach(q => {
      assert(isASCII(q))
    })
  })
})
