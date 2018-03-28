import * as assert from 'assert'
import { lorem } from 'faker'
import 'mocha'
import { spy as sinonSpy, stub as sinonStub } from 'sinon'

import { inject, namespace, q } from 'userdive'
import { USERDIVEApi } from 'userdive/lib/types'
import { NAMESPACE } from '../src/constants'

const GLOBAL_NAME: string = lorem.word()

describe('global async', () => {
  before(() => {
    inject('', { [NAMESPACE]: GLOBAL_NAME })
  })

  const w: any = window
  const factory = (): USERDIVEApi => q(GLOBAL_NAME, window)
  let stub: any
  beforeEach('generate queue', () => {
    delete require.cache[require.resolve('../src/entrypoint')]
    stub = sinonStub(require('../src/requests'), 'get')
    stub.callsFake(() => {
      // nothing todo
    })
  })

  afterEach(() => {
    w[GLOBAL_NAME] = undefined
    stub.restore()
  })

  it('namespace', () => {
    assert(NAMESPACE === namespace)
  })

  it('find global', () => {
    assert(factory()('set', 'dimension1', lorem.word()) === undefined)
    assert(factory()('create', lorem.word(), 'auto') === undefined)
    assert(w[GLOBAL_NAME].q.length === 2)

    require('../src/entrypoint/')
    assert(w[GLOBAL_NAME].q === undefined)
    const agent: any = factory()('send', 'pageview')
    assert(agent.loadTime)

    let _core: any = factory()('send', 'event', {
      eventCategory: 'c1',
      eventAction: 'a1'
    })
    assert(_core.eventId === 1)

    _core = factory()('send', {
      hitType: 'event',
      eventCategory: 'c1',
      eventAction: 'a1'
    })
    assert(_core.eventId === 2)

    let name = lorem.word()
    factory()(`create`, lorem.word(), 'auto', name)
    const agent2 = w[GLOBAL_NAME](`${name}.send`, 'pageview')
    assert(agent2.loadTime)
    assert(agent.id !== agent2.id)

    name = lorem.word()
    factory()(`create`, lorem.word(), 'auto', { name })
    const agent3 = w[GLOBAL_NAME](`${name}.send`, {
      hitType: 'pageview'
    })
    assert(agent3.loadTime)
    assert(agent.id !== agent3.id)
    assert(agent2.id !== agent3.id)
  })

  it('call plugins', () => {
    require('../src/entrypoint/')
    factory()('create', lorem.word(), 'auto')
    const name = lorem.word()
    class Plugin {
      tracker: any
      constructor (tracker: any) {
        assert(tracker.plugins[name])
      }
      echo (value: string) {
        assert(value === 'hello')
      }
    }
    const spy = sinonSpy(Plugin.prototype, 'echo')
    factory()('provide', name, Plugin)
    factory()('require', name)

    w[GLOBAL_NAME](`${name}:echo`, 'hello')
    assert(spy.called)
  })

  it('debug global', () => {
    assert(factory()('create', lorem.word(), 'auto') === undefined)
    assert(factory().q.length)
    require('../src/entrypoint/debug')
    assert(factory().q === undefined)
  })
})
