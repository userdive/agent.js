import assert from 'assert'
import { random, internet } from 'faker'

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
    window[window.USERDIVEObject] = undefined
    window.USERDIVEObject = undefined
  })

  it('find global', () => {
    window.USERDIVEObject = 'ud'
    window[window.USERDIVEObject] = createEntry(window, window.USERDIVEObject)

    assert(window.ud)
    assert(window.ud.q === undefined)

    window.ud('create', random.uuid(), {}, internet.url())

    assert(window.ud.q.length)

    const api = require('../src')
    assert(window.ud('create', random.uuid(), {}, internet.url()))
    assert(typeof api.send === 'function')
    assert(window.ud.q === undefined)
  })
})
