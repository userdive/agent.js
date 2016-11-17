import assert from 'assert'
import { random, internet } from 'faker'

describe('core', () => {
  const Core = require('../src/core')

  it('instance', () => {
    const core = new Core(
      random.uuid(),
      internet.url()
    )
    assert(core)
  })

  it('send', () => {
    const core = new Core(
      random.uuid(),
      internet.url()
    )
    core.send('pageviews', location.pathname)
  })
})
