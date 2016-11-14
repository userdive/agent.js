import assert from 'assert'

describe('index', () => {
  function createEntry (global, name) {
    return global[name] || function () {
      (global[name].q = global[name].q || []).push(arguments)
    }
  }

  beforeEach(() => {
    delete require.cache['../src']
  })

  afterEach(() => {
    window.USERDIVEObject = undefined
    window.ud = undefined
  })

  it('find global', () => {
    window.USERDIVEObject = 'ud'
    window[window.USERDIVEObject] = createEntry(window, window.USERDIVEObject)

    assert(window.ud)
    assert(window.ud.q === undefined)

    window.ud('create')
    assert(window.ud.q.length)

    const api = require('../src')
    assert(typeof api.create === 'function')
    assert(typeof api.send === 'function')
    assert(window.ud.q === undefined)
  })
})
