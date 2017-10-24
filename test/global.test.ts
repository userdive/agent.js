import 'mocha'
import { random, internet } from 'faker'
import { stub as sinonStub } from 'sinon'
import * as assert from 'assert'

import * as ud from 'userdive'
import { NAMESPACE } from '../src/constants'

const GLOBAL_NAME: string = random.word()

describe('global async', () => {
  before(() => {
    ud.inject('', { [NAMESPACE]: GLOBAL_NAME })
  })

  let stub
  beforeEach('generate queue', () => {
    window[GLOBAL_NAME] = ud.q(GLOBAL_NAME, window)
    assert(window[GLOBAL_NAME])
    assert(window[GLOBAL_NAME]['q'] === undefined)
    stub = sinonStub(require('../src/requests'), 'get')
    stub.callsFake((url, query, onload, onerror) => {
      onload()
    })
  })

  afterEach(() => {
    window[GLOBAL_NAME] = undefined
    stub.restore()
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
