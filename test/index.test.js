/* @flow */
import { describe, it, before, after, beforeEach, afterEach } from 'mocha'
import assert from 'assert'
import { random, internet } from 'faker'
import fixture from 'karma-fixture'

import { NAMESPACE } from '../src/constants'
const GLOBAL_NAME: string = random.word()

describe('index', () => {
  before(() => {
    const id = 'test'
    fixture.set(`<script id="${id}"></script>`)

    function set (element: any) {
      element.setAttribute(NAMESPACE, GLOBAL_NAME)
    }
    set(document.getElementById(id))
  })

  after(() => {
    fixture.cleanup()
  })

  function createEntry (global, name) {
    return global[name] || function () {
      (global[name].q = global[name].q || []).push(arguments)
    }
  }

  beforeEach(() => {
    delete require.cache['../src']
  })

  afterEach(() => {
    window[GLOBAL_NAME] = undefined
  })

  it('find global', () => {
    window[GLOBAL_NAME] = createEntry(window, GLOBAL_NAME)

    assert(window[GLOBAL_NAME])
    assert(window[GLOBAL_NAME]['q'] === undefined)

    window[GLOBAL_NAME]('create', random.alphaNumeric(), {}, internet.url())
    assert(window[GLOBAL_NAME]['q'])

    assert(window[GLOBAL_NAME]['q'].length)

    require('../src').default

    assert(window[GLOBAL_NAME]('send', 'pageview') === undefined)

    const agent = window[GLOBAL_NAME](
      'create', random.alphaNumeric(), {}, internet.url()
    )
    assert(agent.send)
    assert(window[GLOBAL_NAME]('send', 'pageview') === undefined)
    assert(window[GLOBAL_NAME]['q'] === undefined)
  })
})
