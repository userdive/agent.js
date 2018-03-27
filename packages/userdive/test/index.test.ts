import * as assert from 'assert'
import { internet, lorem } from 'faker'
import 'mocha'

import userdive from '../src'

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
    assert(userdive()('create', 'id', 'auto') === undefined)
    assert(userdive()('send', 'pageview', internet.url()) === undefined)
    const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
    const name = element.getAttribute(NAMESPACE) as string
    assert(name === '_ud')
  })

  it('customize', () => {
    const name = lorem.word()
    userdive(name)
    const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
    assert(element.getAttribute(NAMESPACE), name)
  })

  it('already loaded', () => {
    window['_ud'] = function () {
      // is not api function
    }
    userdive()
    assert(document.querySelector(`[${NAMESPACE}]`), undefined)
  })

  it('should exercise all ga APIs', () => {
    userdive()('create', lorem.word(), 'auto')
    userdive()('create', lorem.word(), 'auto', {
      allowLinker: true,
      dimension1: lorem.word(),
      name: lorem.word()
    })

    userdive()('create', lorem.word(), 'auto', lorem.word(), {
      allowLinker: true,
      dimension1: lorem.word(),
      name: lorem.word()
    })

    userdive()('send', 'pageview')
    userdive()('send', 'event', {
      eventCategory: 'c1',
      eventAction: 'a1'
    })

    userdive()('send', 'event', {
      eventCategory: 'c1',
      eventAction: 'a1',
      eventLabel: 'l1',
      eventValue: 1
    })

    userdive()('send', {
      hitType: 'event',
      eventCategory: 'c1',
      eventAction: 'a1'
    })

    userdive()('require', 'somePlugin')
    userdive()('require', 'somePlugin', 'option')
    userdive()('require', 'somePlugin', { some: 'options' })
  })
})
