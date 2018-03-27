import * as assert from 'assert'
import { internet, random } from 'faker/locale/ja'
import 'mocha'

import { get, obj2query } from '../src/requests'

describe('requests', () => {
  it('get', () => {
    assert(
      get(internet.url(), [], () => {
        // nothing todo
      }) === undefined
    )
  })

  it('obj2query', () => {
    function isASCII (str: string) {
      return /^[\x00-\x7F]*$/.test(str)
    }
    const queries = obj2query({ foo: random.word() })
    queries.forEach(q => {
      assert(isASCII(q))
    })

    assert(queries.length === 1)
  })
})
