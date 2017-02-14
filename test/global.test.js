/* @flow */
import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { random, internet } from 'faker'
import assert from 'assert'

import { NAMESPACE } from '../src/constants'
const GLOBAL_NAME: string = random.word()

describe('global', () => {
  before(() => {
    const id = random.word()

    const script = document.createElement('script')
    script.id = id

    function append (body: any, element: HTMLElement) {
      body.appendChild(element)
    }

    append(document.body, script)

    function set (element: any) {
      element.setAttribute(NAMESPACE, GLOBAL_NAME)
    }
    set(document.getElementById(id))
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

    const factory = require('../src/global').default
    factory(require('../src/agent').default)

    assert(window[GLOBAL_NAME]('send', 'pageview') === undefined)

    const agent = window[GLOBAL_NAME](
      'create', random.alphaNumeric(), {}, internet.url()
    )
    assert(agent.send)
    assert(window[GLOBAL_NAME]('send', 'pageview') === undefined)
    assert(window[GLOBAL_NAME]['q'] === undefined)
  })
})
