import * as assert from 'assert'

import Agent from '@userdive/agent'
import { random } from 'faker'
import 'mocha'
import { spy as sinonSpy } from 'sinon'

import { name, Plugin as Optimizely } from '../src/plugin'

const emulate = (global = window as any, ready = false, match = true) => {
  if (!ready) {
    return
  }
  const campaignId = `${random.number()}`
  const getCampaignStates = () => {
    return {
      campaignId: {
        id: campaignId,
        experiment: { id: match ? `${random.number()}` : '', name: '' },
        variation: {
          id: match ? `${random.number()}` : '',
          name: `${random.word}`,
        },
      },
    }
  }
  const optimizeObject: any = {
    get: () => {
      return { getCampaignStates }
    },
  }
  global[name] = optimizeObject
}

describe('optimizely', () => {
  let agent: any
  let optimizely: any
  let global: any
  beforeEach(() => {
    agent = new Agent(random.uuid(), 'auto')
    optimizely = new Optimizely(agent)
    global = window as any
    global[name] = undefined
  })

  it('constructor', () => {
    assert(optimizely.tracker)
    assert(optimizely.isSent === false)
  })

  it('getVariation', () => {
    assert.doesNotThrow(() => {
      emulate(global, true)
      optimizely.getVariation(window)
    })
    assert.doesNotThrow(() => {
      emulate(global, true)
      optimizely.getVariation(window, 100, 10)
    })
  })

  it('not load', () => {
    optimizely.getVariation()
    assert(optimizely.isSent === false)
  })

  it('not ready', () => {
    emulate()
    optimizely.getVariation()
    assert(optimizely.isSent === false)
  })

  it('ready', () => {
    emulate(global, true)
    optimizely.getVariation()
    assert(optimizely.isSent)
  })

  it('loaded and no given experiment', () => {
    emulate(global, true, false)
    optimizely.getVariation()
    assert(optimizely.isSent === false)

    emulate(global, true)
    optimizely.getVariation()
    assert(optimizely.isSent)
  })

  it('after send', () => {
    const spy = sinonSpy(optimizely, 'sendEvents')
    optimizely.isSent = true
    optimizely.getVariation()
    emulate(global, true)
    assert(!spy.called)
  })
})
