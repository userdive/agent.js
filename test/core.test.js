import assert from 'assert'
import { random, internet } from 'faker'

describe('core', () => {
  const Agent = require('../src/core')

  it('instance', () => {
    const agent = new Agent(
      random.alphaNumeric(),
      internet.url(),
      {}
    )
    assert(agent)
  })

  it('send', () => {
    const agent = new Agent(
      random.alphaNumeric(),
      internet.url(),
      {}
    )
    agent.send('pageview', location.pathname)
  })
})
