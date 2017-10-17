import 'mocha'
import * as assert from 'assert'
import { internet, random } from 'faker/locale/ja'

describe('requests', () => {
  const requests = require('../src/requests')

  const callback = (): void => {
    //
  }

  it('get', () => {
    assert(requests.get(internet.url(), [], callback, callback) === undefined)
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
