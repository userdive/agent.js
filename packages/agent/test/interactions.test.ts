import * as sinon from 'sinon'

import InteractionEventEmitter from '../src/interactions'

describe('interactions', () => {
  let target: EventTarget
  let instance: InteractionEventEmitter

  beforeEach(function () {
    target = 'addEventListener' in window ? window : document
    instance = new InteractionEventEmitter()
    instance.bind(target)
  })

  afterEach(function () {
    instance.unbind()
  })

  it('init', () => {
    sinon.assert.match(typeof instance.init, 'function')
  })
})
