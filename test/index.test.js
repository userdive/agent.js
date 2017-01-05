/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'
import assert from 'assert'
import { random, internet } from 'faker'

import { GLOBAL } from '../src/constants'

describe('index', () => {
  function createEntry (global, name) {
    return global[name] || function () {
      (global[name].q = global[name].q || []).push(arguments)
    }
  }

  beforeEach(() => {
    delete require.cache['../src']
  })

  afterEach(() => {
    window[window[GLOBAL]] = undefined
    window[GLOBAL] = undefined
  })

  it('find global', () => {
    window[GLOBAL] = 'ud'
    window[window[GLOBAL]] = createEntry(window, window[GLOBAL])

    assert(window[window[GLOBAL]])
    assert(window[window[GLOBAL]]['q'] === undefined)

    window.ud('create', random.alphaNumeric(), {}, internet.url())
    assert(window[window[GLOBAL]]['q'])

    assert(window[window[GLOBAL]].q.length)

    require('../src').default
    const agent = window[window[GLOBAL]](
      'create', random.alphaNumeric(), {}, internet.url()
    )
    assert(agent.send)
    assert(window[window[GLOBAL]]['q'] === undefined)
  })
})
