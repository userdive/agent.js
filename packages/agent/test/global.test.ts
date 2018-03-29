import * as assert from 'assert'
import { lorem } from 'faker'
import 'mocha'
import { spy as sinonSpy, stub as sinonStub, useFakeTimers } from 'sinon'

import { inject, namespace, q } from 'userdive'
import { USERDIVEApi } from 'userdive/lib/types'
import { NAMESPACE } from '../src/constants'

const GLOBAL_NAME: string = lorem.word()

describe('global async', () => {
  before(() => {
    inject('', { [NAMESPACE]: GLOBAL_NAME })
  })

  const factory = (): USERDIVEApi => q(GLOBAL_NAME, window)
  let stub: any
  beforeEach('generate queue', () => {
    delete require.cache[require.resolve('../src/entrypoint')]
    stub = sinonStub(require('../src/requests'), 'get')
    stub.callsFake(() => {
      // nothing todo
    })
    ;((w: any) => {
      w[GLOBAL_NAME] = undefined
    })(window)
  })

  afterEach(() => {
    stub.restore()
  })

  it('namespace', () => {
    assert(NAMESPACE === namespace)
  })

  it('find global', () => {
    const timer = useFakeTimers(new Date().getTime())
    assert(factory()('set', 'dimension1', lorem.word()) === undefined)
    assert(factory()('create', lorem.word(), 'auto') === undefined)
    assert(factory().q.length === 2)

    require('../src/entrypoint/')
    timer.tick(100)
    timer.restore()
    assert(factory().q === undefined)
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
    const agent2 = (factory() as any)(`${name}.send`, 'pageview')
    assert(agent2.loadTime)
    assert(agent.id !== agent2.id)

    name = lorem.word()
    factory()(`create`, lorem.word(), 'auto', { name })
    const agent3 = (factory() as any)(`${name}.send`, {
      hitType: 'pageview'
    })
    assert(agent3.loadTime)

    name = lorem.word()
    ;(factory() as any)(`create`, lorem.word(), { name }) // before v1 syntax
    const agent4 = (factory() as any)(`${name}.send`, 'pageview', {
      dimension1: lorem.word()
    })
    assert(agent4.loadTime)

    assert(agent.id !== agent3.id)
    assert(agent2.id !== agent3.id)
    assert(agent3.id !== agent4.id)
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
    ;(factory() as any)(`${name}:echo`, 'hello')
    assert(spy.called)
    spy.restore()
  })

  it('call plugin queue', () => {
    const timer = useFakeTimers(new Date().getTime())
    const name = lorem.word()
    const expected = lorem.word()
    class Plugin {
      tracker: any
      constructor (tracker: any) {
        assert(tracker.plugins[name])
      }
      echo (value: string) {
        assert(value === expected)
      }
    }
    const spy = sinonSpy(Plugin.prototype, 'echo')

    // reverse order queue
    ;(factory() as any)(`${name}:echo`, expected)
    factory()('require', name)
    factory()('provide', name, Plugin)
    factory()('create', lorem.word(), 'auto')

    require('../src/entrypoint/')
    timer.tick(3000)
    assert(spy.called)
    spy.restore()
    timer.restore()
  })

  it('debug global', () => {
    const timer = useFakeTimers(new Date().getTime())
    assert(factory()('create', lorem.word(), 'auto') === undefined)
    assert(factory().q.length)
    require('../src/entrypoint/debug')
    timer.tick(100)
    assert(factory().q === undefined)
    timer.restore()
  })
})
