import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'
import { stub as sinonStub } from 'sinon'

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
    let executer = window[GLOBAL_NAME]('send', 'pageview')
    assert.equal(executer.commandQueue.length, 0)
    const agent = executer.agents['default']
    assert(agent)
    assert(agent.core.active)

    const name = lorem.word()
    executer = window[GLOBAL_NAME](
      `create.${name}`,
      random.alphaNumeric(),
      {},
      internet.url()
    )
    assert(window[GLOBAL_NAME](`send.${name}`, 'pageview'))
    const agent2 = executer.agents[name]
    assert(agent2)
    assert(agent.core.id !== agent2.core.id)
  })

  it('debug global', () => {
    assert.equal(
      window[GLOBAL_NAME]('create', random.alphaNumeric(), {}, internet.url()),
      undefined
    )
    assert(window[GLOBAL_NAME]['q'].length)
    require('../src/entrypoint/debug')
    assert(window[GLOBAL_NAME]['q'] === undefined)

    const executer = window[GLOBAL_NAME]('send', 'pageview')
    assert(executer.agents['default'].core.active)
  })
})
