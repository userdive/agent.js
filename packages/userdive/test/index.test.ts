import * as assert from 'assert'
import { internet } from 'faker'
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
    const _ud = userdive('', '', '')
    assert(typeof _ud === 'function')
    assert(_ud('create', 'id', 'auto') === undefined)
    assert(_ud('send', 'pageview', internet.url()) === undefined)
    const element: any = document.querySelector(`[${NAMESPACE}]`)
    const name: string = element.getAttribute(NAMESPACE)
    assert(name === '_ud')
  })
})
