import assert from 'assert'
import { random, internet } from 'faker'

describe('core', () => {
  const Agent = require('../src/core')
  let agent
  beforeEach(() => {
    agent = new Agent(
      random.alphaNumeric(),
      {
        baseUrl: internet.url(),
        cookieName: random.alphaNumeric()
      }
    )
  })

  it('instance', () => {
    assert(agent)
  })

  it('send', () => {
    agent.send('pageview', location.pathname)
  })

  it('set', () => {
    const url = internet.url()
    const state = agent.set('page', url)
    assert(state.env.l === url)

    for (let i = 1; i <= 5; i++) {
      agent.set(`dimension${i}`, random.alphaNumeric())
      assert(state.custom[`cd${i}`])
      agent.set(`metric${i}`, random.alphaNumeric())
      assert(state.custom[`cm${i}`])
    }
  })

  it('setObject', () => {
    const url = internet.url()
    const state = agent.setObject({
      'dimension1': random.alphaNumeric(),
      'dimension2': random.alphaNumeric(),
      'dimension3': random.alphaNumeric(),
      'dimension4': random.alphaNumeric(),
      'dimension5': random.alphaNumeric(),
      'metric1': random.alphaNumeric(),
      'metric2': random.alphaNumeric(),
      'metric3': random.alphaNumeric(),
      'metric4': random.alphaNumeric(),
      'metric5': random.alphaNumeric(),
      'page': url,
      'undefined': random.word() // useless
    })
    assert(state.env.l === url)
    assert(Object.keys(state.custom).length === 10)
  })
})
