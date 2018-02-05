import * as assert from 'assert'
import { internet, random } from 'faker'
import 'mocha'
import { spy as sinonSpy, stub } from 'sinon'
import Linker from '../src/linker'

describe('agent', () => {
  const Agent = require('@userdive/agent').default
  const Linker = require('../src/linker').default
  const createLink = () => {
    let link = document.createElement('a')
    link.href = 'http://example.com/example'
    return link
  }

  it('constructor', () => {
    const agent = new Agent(random.uuid(), { allowLink: true })
    const linker = new Linker(agent)
    assert(linker.agent)
  })

  // it('autoLink', () => {
  //   const link = createLink()
  //   const linker: Linker = new Linker(agent)
  //   linker.autoLink([/^*.example.org/, 'example.com'])
  //   const before = link.href
  //   link.click()
  //   assert(before !== link.href)
  // })
})
