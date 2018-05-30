import Agent from '@userdive/agent'
import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import Vwo from '../src/plugin'

const emulate = (instance: any) => {
  const expId: string = `${random.number()}`
  const combinationChosen = `${random.number()}`
  return instance.sendEvent(window, [expId], { [expId]: {
    combination_chosen: combinationChosen,
    comb_n: { [combinationChosen]: random.word },
    ready: true
  }})
}

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
    assert(instance.isSent === false)
  })

  it('getVariation', () => {
    assert.doesNotThrow(() => {
      vwo.getVariation(window)
    })
    assert.doesNotThrow(() => {
      vwo.getVariation(window, 300, 20)
    })
  })

  it('fail sendEvent', () => {
    const instance: any = vwo
    instance.sendEvent(window, [], {})()
    assert(instance.isSent === false)
  })

  it('success sendEvent', () => {
    const instance: any = vwo
    emulate(instance)()
    assert(instance.isSent)
  })

})
