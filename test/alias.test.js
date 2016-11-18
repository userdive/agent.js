import assert from 'assert'

describe('alist', () => {
  const alias = require('../src/alias')
  it('timestamp', () => {
    assert(alias.timestamp())
  })

  it('body', () => {
    assert(typeof alias.resourceWidth === 'function')
    assert(typeof alias.resourceHeight === 'function')
  })

  it('screen', () => {
    assert(typeof alias.screenHeight === 'function')
    assert(typeof alias.screenWidth === 'function')
  })

  it('window', () => {
    assert(alias.windowHeight())
    assert(alias.windowWidth())
  })
})
