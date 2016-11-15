import assert from 'assert'

describe('core', () => {
  const Core = require('../src/core')

  it('base', () => {
    const c = new Core()
    assert(c.base)
  })
})
