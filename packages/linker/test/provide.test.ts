import Agent from '@userdive/agent'
import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'
import * as ud from 'userdive'
import { NAMESPACE } from '../src/provide'

describe('provide', () => {
  const name = random.word()
  afterEach(() => {
    window[name] = undefined
  })

  it('if not exist queue', () => {
    ud.inject('', { [NAMESPACE]: name })
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
    ud.inject('', { [NAMESPACE]: name })
    window[name] = ud.q(name, window)
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
