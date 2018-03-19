import * as assert from 'assert'
import { internet, lorem } from 'faker'
import 'mocha'
import { spy as sinonSpy, stub as sinonStub } from 'sinon'

import { inject, namespace, q } from 'userdive'
import { NAMESPACE } from '../src/constants'

const GLOBAL_NAME: string = lorem.word()

describe('global async', () => {
  before(() => {
    inject('', { [NAMESPACE]: GLOBAL_NAME })
  })

  let stub
  beforeEach('generate queue', () => {
    delete require.cache[require.resolve('../src/entrypoint')]
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

  it('namespace', () => {
    assert(NAMESPACE === namespace)
  })

  it('find global', () => {
    assert.equal(window[GLOBAL_NAME]('create', lorem.word(), {}), undefined)
    assert(window[GLOBAL_NAME]['q'].length === 1)

    require('../src/entrypoint/')
    assert(window[GLOBAL_NAME]['q'] === undefined)
    const agent: any = window[GLOBAL_NAME]('send', 'pageview')
    assert(agent.loadTime)

    let name = lorem.word()
    window[GLOBAL_NAME](`create`, lorem.word(), {}, name)
    const agent2 = window[GLOBAL_NAME](`${name}.send`, 'pageview')
    assert(agent2.loadTime)
    assert(agent.id !== agent2.id)

    name = lorem.word()
    window[GLOBAL_NAME](`create`, lorem.word(), { name })
    const agent3 = window[GLOBAL_NAME](`${name}.send`, 'pageview')
    assert(agent3.loadTime)
    assert(agent.id !== agent3.id)
    assert(agent2.id !== agent3.id)
  })

  it('call plugins', () => {
    require('../src/entrypoint/')
    window[GLOBAL_NAME]('create', lorem.word(), {})
    const name = lorem.word()
    class Plugin {
      tracker: any
      constructor (tracker) {
        assert(tracker.plugins[name])
      }
      echo (value: string) {
        assert(value === 'hello')
      }
    }
    const spy = sinonSpy(Plugin.prototype, 'echo')
    window[GLOBAL_NAME]('provide', name, Plugin)
    window[GLOBAL_NAME]('require', name)

    const url: string = internet.url()
    window[GLOBAL_NAME](`${name}:echo`, 'hello')
    assert(spy.called)
  })

  it('debug global', () => {
    assert.equal(window[GLOBAL_NAME]('create', lorem.word(), {}), undefined)
    assert(window[GLOBAL_NAME]['q'].length)
    require('../src/entrypoint/debug')
    assert(window[GLOBAL_NAME]['q'] === undefined)
  })
})
