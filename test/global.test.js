/* @flow */
import {describe, it, before, beforeEach, afterEach} from 'mocha'
import {random, internet} from 'faker'
import assert from 'assert'

import {inject, createEntry} from './helpers/injectScript'

const GLOBAL_NAME: string = random.word()

describe('global async', () => {
  before(() => {
    inject(GLOBAL_NAME)
  })

  beforeEach('generate queue', () => {
    window[GLOBAL_NAME] = createEntry(window, GLOBAL_NAME)
    assert(window[GLOBAL_NAME])
    assert(window[GLOBAL_NAME]['q'] === undefined)
  })

  afterEach(() => {
    window[GLOBAL_NAME] = undefined
  })

  it('find global', () => {
    assert.equal(
      window[GLOBAL_NAME]('create', random.alphaNumeric(), {}, internet.url()),
      undefined
    )
    assert(window[GLOBAL_NAME]['q'].length)
    require('../src/entrypoint/')
    assert(window[GLOBAL_NAME]['q'] === undefined)

    const agent = window[GLOBAL_NAME]('send', 'pageview')
    assert(agent.active)

    const name = random.word()
    const agent2 = window[GLOBAL_NAME](
      `create.${name}`,
      random.alphaNumeric(),
      {},
      internet.url()
    )
    assert(agent.id !== agent2.id)
    assert(window[GLOBAL_NAME](`send.${name}`, 'pageview'))

    const agent3 = window[GLOBAL_NAME]('send', 'pageview')
    assert(agent.id === agent3.id)
  })

  it('debug global', () => {
    assert.equal(
      window[GLOBAL_NAME]('create', random.alphaNumeric(), {}, internet.url()),
      undefined
    )
    assert(window[GLOBAL_NAME]['q'].length)
    require('../src/entrypoint/debug')
    assert(window[GLOBAL_NAME]['q'] === undefined)

    const agent = window[GLOBAL_NAME]('send', 'pageview')
    assert(agent.active)
  })
})
