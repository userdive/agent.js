import assert from 'assert'
import { random, internet } from 'faker'

describe('core', () => {
  const Core = require('../src/core')

  it('core', () => {
    const core = new Core(
      random.uuid(),
      internet.url()
    )
    assert(core)
  })
})
