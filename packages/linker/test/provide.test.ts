import Agent from '@userdive/agent'
import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'
import { inject, namespace as NAMESPACE, q } from 'userdive'

describe('provide', () => {
  const name = random.word()
  afterEach(() => {
    window[name] = undefined
  })

  it('if not exist queue', () => {
    inject('', { [NAMESPACE]: name })
    const provide = require('../src/provide').default
    const Linker = require('../src/linker').default
    provide('linker', Linker)
    assert(window[name].q)
    const provideQueue = window[name].q[0]
    assert(provideQueue[0] === 'provide')
    assert(provideQueue[1] === 'linker')
    assert(provideQueue[2] === Linker)
  })

  it('if queue already exists', () => {
    inject('', { [NAMESPACE]: name })
    window[name] = q(name, window)
    const provide = require('../src/provide').default
    const Linker = require('../src/linker').default
    provide('linker', Linker)
    assert(window[name].q)
    const provideQueue = window[name].q[0]
    assert(provideQueue[0] === 'provide')
    assert(provideQueue[1] === 'linker')
    assert(provideQueue[2] === Linker)
  })
})
