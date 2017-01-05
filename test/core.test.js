/* @flow */
import { describe, it, beforeEach } from 'mocha'
import assert from 'assert'
import { random, internet } from 'faker'
import Raven from 'raven-js'

describe('core', () => {
  const Agent = require('../src/core').default
  let agent
  beforeEach(() => {
    agent = new Agent(
      random.alphaNumeric(),
      {
        baseUrl: internet.url(),
        cookieName: random.alphaNumeric(),
        cookieDomain: random.alphaNumeric(),
        cookieExpires: 0,
        Raven: Raven
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

    agent.set(`dimension1`, random.alphaNumeric())
    agent.set(`dimension2`, random.alphaNumeric())
    agent.set(`dimension3`, random.alphaNumeric())
    agent.set(`dimension4`, random.alphaNumeric())
    agent.set(`dimension5`, random.alphaNumeric())
    agent.set(`metric1`, random.alphaNumeric())
    agent.set(`metric2`, random.alphaNumeric())
    agent.set(`metric3`, random.alphaNumeric())
    agent.set(`metric4`, random.alphaNumeric())
    agent.set(`metric5`, random.alphaNumeric())
    for (let i = 1; i <= 5; i++) {
      assert(state.custom[`cd${i}`])
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
