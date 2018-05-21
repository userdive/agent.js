import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import Kzs from '../src/plugin'

describe('kzs', () => {
  let agent: any
  let kzs: Kzs
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
    kzs = new Kzs(agent)
  })

  it('constructor', () => {
    const instance: any = kzs
    assert(instance.tracker)
  })

  it('getVariation', () => {
    assert.doesNotThrow(() => {
      kzs.getVariation()
    })
  })
})
