/* @flow */
import { describe, it, before, beforeEach, afterEach } from 'mocha'
import assert from 'assert'
import { random, internet } from 'faker'
import mountDOM from 'jsdom-mount'

import { NAMESPACE } from '../src/constants'
const GLOBAL_NAME: string = 'ud'

describe('index', () => {
  before(() => {
    const id = 'test'
    mountDOM(`<script id="${id}"></script>`)
    const element = document.getElementById(id)
    element.setAttribute(NAMESPACE, GLOBAL_NAME)
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

    window.ud('create', random.alphaNumeric(), {}, internet.url())
    assert(window[GLOBAL_NAME]['q'])

    assert(window[GLOBAL_NAME]['q'].length)

    require('../src').default
    const agent = window[GLOBAL_NAME](
      'create', random.alphaNumeric(), {}, internet.url()
    )
    assert(agent.send)
    assert(window[GLOBAL_NAME]['q'] === undefined)
  })
})
