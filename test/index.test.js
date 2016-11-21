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

    assert(window[window.USERDIVEObject])
    assert(window[window.USERDIVEObject]['q'] === undefined)

    window.ud('create', random.alphaNumeric(), {}, internet.url())
    assert(window[window.USERDIVEObject]['q'])

    assert(window[window.USERDIVEObject].q.length)

    require('../src')
    const agent = window[window.USERDIVEObject](
      'create', random.alphaNumeric(), {}, internet.url()
    )
    assert(agent.send)
    assert(window[window.USERDIVEObject]['q'] === undefined)
  })
})
