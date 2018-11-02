import * as assert from 'assert'
import { lorem, random } from 'faker'
import { get as getCookie } from 'js-cookie'
import 'mocha'
import { spy as sinonSpy, stub as sinonStub, useFakeTimers } from 'sinon'

import { inject, namespace, q } from 'userdive'
import { USERDIVEApi } from 'userdive/lib/types'
import { NAMESPACE, SETTINGS } from '../src/constants'

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
    const clean = (w: any) => {
      w[GLOBAL_NAME] = undefined
    }
    clean(window)
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
    timer.tick(1000)
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
    factory()('create', lorem.word(), 'auto', name)
    const agent2 = (factory() as any)(`${name}.send`, 'pageview')
    assert(agent2.loadTime)
    assert(agent.id !== agent2.id)

    name = lorem.word()
    factory()('create', lorem.word(), 'auto', { name })
    const agent3 = (factory() as any)(`${name}.send`, {
      hitType: 'pageview'
    })
    assert(agent3.loadTime)

    name = lorem.word()
    const api = factory() as any
    api('create', lorem.word(), { auto: true, name }) // v0.x supported options
    const agent4 = (factory() as any)(`${name}.send`, 'pageview', {
      dimension1: lorem.word()
    })
    assert(agent4.loadTime)

    assert(agent.id !== agent3.id)
    assert(agent2.id !== agent3.id)
    assert(agent3.id !== agent4.id)
  })

  it('should be create with clientId', () => {
    require('../src/entrypoint/')
    const clientId = random.uuid()
    factory()('create', lorem.word(), { clientId })

    assert(clientId, getCookie(SETTINGS.cookieName))
    assert(clientId, factory()('get', 'clientId'))
  })

  it('call plugins', () => {
    require('../src/entrypoint/')
    factory()('create', lorem.word(), 'auto')
    const name = lorem.word()
    class Plugin {
      constructor (tracker: any) {
        assert(tracker.plugins[name])
      }
      public echo (value: string) {
        assert(value === 'hello')
      }
    }

    const spy = sinonSpy(Plugin.prototype, 'echo')
    factory()('provide', name, Plugin)
    factory()('require', name)
    const api = factory() as any
    api(`${name}:echo`, 'hello')
    assert(spy.called)
    spy.restore()
  })

  it('call plugin queue', () => {
    const timer = useFakeTimers(new Date().getTime())
    const name = lorem.word()
    const expected = lorem.word()
    class Plugin {
      constructor (tracker: any) {
        assert(tracker.plugins[name])
      }
      public echo (value: string) {
        assert(value === expected)
      }
    }
    const spy = sinonSpy(Plugin.prototype, 'echo')

    // reverse order queue
    const api = factory() as any
    api(`${name}:echo`, expected)
    factory()('require', name)
    factory()('provide', name, Plugin)
    factory()('create', lorem.word(), 'auto')

    require('../src/entrypoint/')
    timer.tick(5000)
    assert(spy.called)
    spy.restore()
    timer.restore()
  })

  it('timeout queue', () => {
    const timer = useFakeTimers(new Date().getTime())
    const spy = sinonSpy(require('../src/logger'), 'warning')

    factory()('require', name) // undefined create
    require('../src/entrypoint/')

    timer.tick(5500)

    assert(spy.called)
    stub.restore()
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
