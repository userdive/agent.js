import * as assert from 'assert'

import Agent from '@userdive/agent'
import { random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'

import Vwo from '../src/plugin'

const emulate = (global = window as any, ready = false) => {
  const expId = `${random.number()}`
  const combinationChosen = `${random.number()}`
  global._vis_opt_queue = []
  global._vwo_exp_ids = [expId]
  global._vwo_exp = {
    [expId]: {
      combination_chosen: combinationChosen,
      comb_n: { [combinationChosen]: random.word },
      ready,
    },
  }
}

describe('vwo', () => {
  let agent: any
  let vwo: any
  let global: any
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
    vwo = new Vwo(agent)
    global = window as any
    global._vis_opt_queue = undefined
    global._vwo_exp_ids = undefined
  })

  it('constructor', () => {
    assert(vwo.tracker)
    assert(vwo.isSent === false)
  })

  it('getVariation', () => {
    assert.doesNotThrow(() => {
      vwo.getVariation(window)
    })
    assert.doesNotThrow(() => {
      vwo.getVariation(window, 300, 20)
    })
  })

  it('add queue', () => {
    emulate(global)
    vwo.getVariation()
    assert(global._vis_opt_queue.length === 1)
    assert(!vwo.isSent)
  })

  it('not ready', () => {
    emulate(global)
    vwo.getVariation()
    assert(global._vis_opt_queue.length === 1)
    global._vis_opt_queue[0]()
    assert(!vwo.isSent)
  })

  it('ready', () => {
    emulate(global, true)
    const spy = sinonSpy(vwo, 'sendEvents')
    vwo.getVariation()
    assert(global._vis_opt_queue.length === 1)
    global._vis_opt_queue[0]()
    assert(spy.calledOnce)
    assert(vwo.isSent)
  })

  it('not injected vwo object', () => {
    const spy = sinonSpy(vwo, 'sendEvents')
    vwo.getVariation()
    assert(!spy.called)
  })

  it('after send', () => {
    const spy = sinonSpy(vwo, 'sendEvents')
    vwo.isSent = true
    vwo.getVariation()
    emulate(global, true)
    assert(!spy.called)
  })
})
