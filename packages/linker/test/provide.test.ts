import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import { inject, namespace as NAMESPACE, q } from 'userdive'

import Linker from '../src/linker'
import provide from '../src/provide'

describe('provide', () => {
  const name = random.word()
  const w: any = window
  afterEach(() => {
    w[name] = undefined
  })

  it('if not exist queue', () => {
    inject('', { [NAMESPACE]: name })
    provide('linker', Linker)
    assert(w[name].q)
    const provideQueue = w[name].q[0]
    assert(provideQueue[0] === 'provide')
    assert(provideQueue[1] === 'linker')
    assert(provideQueue[2] === Linker)
  })

  it('if queue already exists', () => {
    inject('', { [NAMESPACE]: name })
    w[name] = q(name, window)
    provide('linker', Linker)
    assert(w[name].q)
    const provideQueue = w[name].q[0]
    assert(provideQueue[0] === 'provide')
    assert(provideQueue[1] === 'linker')
    assert(provideQueue[2] === Linker)
  })
})
