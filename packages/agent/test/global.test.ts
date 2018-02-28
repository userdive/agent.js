import * as assert from 'assert'
import { internet, lorem } from 'faker'
import 'mocha'
import { stub as sinonStub } from 'sinon'

import { inject, q } from 'userdive'
import { NAMESPACE } from '../src/constants'

const GLOBAL_NAME: string = lorem.word()

describe('global async', () => {
  before(() => {
    inject('', { [NAMESPACE]: GLOBAL_NAME })
  })

  let stub
  beforeEach('generate queue', () => {
    window[GLOBAL_NAME] = q(GLOBAL_NAME, window)
    assert(window[GLOBAL_NAME])
    assert(window[GLOBAL_NAME]['q'] === undefined)
    stub = sinonStub(require('../src/requests'), 'get')
    stub.callsFake((url, query, onerror) => {
      // nothing todo
    })
  })

  afterEach(() => {
    window[GLOBAL_NAME] = undefined
    stub.restore()
  })

  it('find global', () => {
    assert.equal(window[GLOBAL_NAME]('create', lorem.word(), {}), undefined)
    assert(window[GLOBAL_NAME]['q'].length === 1)

    require('../src/entrypoint/')
    assert(window[GLOBAL_NAME]['q'] === undefined)
    const agent: any = window[GLOBAL_NAME]('send', 'pageview')
    assert(agent.core.loadTime)

    const name = lorem.word()
    window[GLOBAL_NAME](`create`, lorem.word(), {}, name)
    const agent2 = window[GLOBAL_NAME](`${name}.send`, 'pageview')
    assert(agent.core.id !== agent2.core.id)
  })

  it('debug global', () => {
    assert.equal(window[GLOBAL_NAME]('create', lorem.word(), {}), undefined)
    assert(window[GLOBAL_NAME]['q'].length)
    require('../src/entrypoint/debug')
    assert(window[GLOBAL_NAME]['q'] === undefined)
  })
})
