import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import Vwo from '../src/plugin'

describe('vwo', () => {
  let agent: any
  let vwo: Vwo
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
    vwo = new Vwo(agent)
  })

  it('constructor', () => {
    const instance: any = vwo
    assert(instance.tracker)
  })

  it('getVariation', () => {
    assert.doesNotThrow(() => {
      vwo.getVariation(window)
    })
    assert.doesNotThrow(() => {
      vwo.getVariation(window, 300, 20)
    })
  })
})
