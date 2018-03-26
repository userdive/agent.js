import * as assert from 'assert'
import { internet, lorem } from 'faker'
import 'mocha'

import factory from '../src'

const DEFAULT_NAME = '_ud'

interface IWindow {
  [key: string]: any
}

describe('aync loader', () => {
  const NAMESPACE = `data-ud-namespace`

  it('undefined', () => {
    assert((window as IWindow)[DEFAULT_NAME] === undefined)
  })

  it('entrypoint', () => {
    const _ud = factory()
    assert(typeof _ud === 'function')
    assert(_ud('create', 'id', 'auto') === undefined)
    assert(_ud('send', 'pageview', internet.url()) === undefined)
    const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
    const name: string = element.getAttribute(NAMESPACE)
    assert(name === '_ud')
  })

  it('customize', () => {
    const name = lorem.word()
    const _ud = factory(name)
    const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
    assert(element.getAttribute(NAMESPACE), name)
  })

  it('already loaded', () => {
    window['_ud'] = function () {
      // is not api function
    }
    const _ud = factory()
    assert(document.querySelector(`[${NAMESPACE}]`), undefined)
  })

  it('should exercise all ga APIs', () => {
    const _ud = factory()
    _ud('create', lorem.word(), 'auto')
    _ud('create', lorem.word(), 'auto', {
      allowLinker: true,
      dimension1: lorem.word(),
      name: lorem.word()
    })

    _ud('create', lorem.word(), 'auto', lorem.word(), {
      allowLinker: true,
      dimension1: lorem.word(),
      name: lorem.word()
    })

    _ud('send', 'pageview')
    _ud('send', 'event', {
      eventCategory: 'c1',
      eventAction: 'a1'
    })

    _ud('send', 'event', {
      eventCategory: 'c1',
      eventAction: 'a1',
      eventLabel: 'l1',
      eventValue: 1
    })

    _ud('send', {
      hitType: 'event',
      eventCategory: 'c1',
      eventAction: 'a1'
    })

    _ud('require', 'somePlugin')
    _ud('require', 'somePlugin', 'option')
    _ud('require', 'somePlugin', { some: 'options' })
  })
})
