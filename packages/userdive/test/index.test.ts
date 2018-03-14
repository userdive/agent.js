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
})
