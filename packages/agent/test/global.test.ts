import * as assert from 'assert'
import { internet, lorem } from 'faker'
import 'mocha'
import { spy as sinonSpy, stub as sinonStub } from 'sinon'

import { inject, namespace, q } from 'userdive'
import { USERDIVEApi } from 'userdive/lib/types'
import { NAMESPACE } from '../src/constants'

const GLOBAL_NAME: string = lorem.word()

describe.only('global async', () => {
  before(() => {
    inject('', { [NAMESPACE]: GLOBAL_NAME })
  })

  let _ud: USERDIVEApi
  let stub
  beforeEach('generate queue', () => {
    delete require.cache[require.resolve('../src/entrypoint')]
    _ud = q(GLOBAL_NAME, window) as USERDIVEApi
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
    assert(_ud('set', 'dimension1', lorem.word()) === undefined)
    assert(_ud('create', lorem.word(), {}) === undefined)
    assert(_ud['q'].length === 2)

    require('../src/entrypoint/')
    assert(_ud.q === undefined)
    const agent: any = window[GLOBAL_NAME]('send', 'pageview')
    assert(agent.loadTime)

    let name = lorem.word()
    _ud(`create`, lorem.word(), {}, name)
    const agent2 = window[GLOBAL_NAME](`${name}.send`, 'pageview')
    assert(agent2.loadTime)
    assert(agent.id !== agent2.id)

    name = lorem.word()
    _ud(`create`, lorem.word(), { name })
    const agent3 = window[GLOBAL_NAME](`${name}.send`, 'pageview')
    assert(agent3.loadTime)
    assert(agent.id !== agent3.id)
    assert(agent2.id !== agent3.id)
  })

  it('call plugins', () => {
    require('../src/entrypoint/')
    _ud('create', lorem.word(), {})
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
    _ud('provide', name, Plugin)
    _ud('require', name)

    const url: string = internet.url()
    window[GLOBAL_NAME](`${name}:echo`, 'hello')
    assert(spy.called)
  })

  it('debug global', () => {
    assert(_ud('create', lorem.word(), {}) === undefined)
    assert(_ud.q.length)
    require('../src/entrypoint/debug')
    assert(_ud.q === undefined)
  })
})
