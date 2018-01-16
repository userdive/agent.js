import * as assert from 'assert'
import { internet, random } from 'faker/locale/ja'
import 'mocha'

describe('requests', () => {
  const requests = require('../src/requests')
  const dummyHandler = () => {
    // nothing to do
  }

  it('get', () => {
    assert(
      requests.get(internet.url(), [], dummyHandler, dummyHandler) === undefined
    )
  })

  it('obj2query', () => {
    function isASCII (str: string) {
      return /^[\x00-\x7F]*$/.test(str)
    }
    const queries = requests.obj2query({ foo: random.word() })
    queries.forEach(q => {
      assert(isASCII(q))
    })

    assert(queries.length === 1)
  })
})
