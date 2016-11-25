import assert from 'assert'
import { random, internet } from 'faker'

describe('core', () => {
  const Agent = require('../src/core')

  it('instance', () => {
    const agent = new Agent(
      random.alphaNumeric(),
      {
        baseUrl: internet.url(),
        cookieName: random.alphaNumeric()
      }
    )
    assert(agent)
  })

  it('send', () => {
    const agent = new Agent(
      random.alphaNumeric(),
      {
        baseUrl: internet.url(),
        cookieName: random.alphaNumeric()
      }
    )
    agent.send('pageview', location.pathname)
  })
})
