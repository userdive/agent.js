import * as assert from 'assert'

import { internet, lorem } from 'faker'
import 'mocha'

import userdive, { namespace as NAMESPACE } from '../src'

const DEFAULT_NAME = '_ud'

describe('userdive.js', () => {
  beforeEach(() => {
    ;(window as any)[DEFAULT_NAME] = undefined
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
    ;((w: any) =>
      (w['_ud'] = function() {
        // is not api function
      }))(window)
    userdive()
    assert(document.querySelector(`[${NAMESPACE}]`), undefined)
  })

  it('should exercise all ga APIs', () => {
    userdive()('create', lorem.word(), 'auto')
    userdive()('create', lorem.word(), 'auto', {
      allowLinker: true,
      dimension1: lorem.word(),
      name: lorem.word(),
    })

    userdive()('create', lorem.word(), 'auto', lorem.word(), {
      allowLinker: true,
      dimension1: lorem.word(),
      name: lorem.word(),
    })

    userdive()('send', 'pageview')
    userdive()('send', 'event', {
      eventCategory: 'c1',
      eventAction: 'a1',
    })

    userdive()('send', 'event', {
      eventCategory: 'c1',
      eventAction: 'a1',
      eventLabel: 'l1',
      eventValue: 1,
    })

    userdive()('send', {
      hitType: 'event',
      eventCategory: 'c1',
      eventAction: 'a1',
    })

    userdive()('require', 'somePlugin')
    userdive()('require', 'somePlugin', 'option')
    userdive()('require', 'somePlugin', { some: 'options' })
  })
})
