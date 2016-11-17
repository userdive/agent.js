import assert from 'assert'

describe('alist', () => {
  const alias = require('../src/alias')
  it('timestamp', () => {
    assert(alias.timestamp())
  })

  it.skip('navigator', () => {
    assert(alias.sendBeacon())
  })

  it.skip('body', () => {
    assert(alias.h())
    assert(alias.w())
  })

  it.skip('screen', () => {
    assert(alias.sw())
    assert(alias.sh())
  })

  it('window', () => {
    assert(alias.wh())
    assert(alias.ww())
  })
})
