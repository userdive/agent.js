import * as sinon from 'sinon'

import InteractionEventEmitter from '../src/interactions'

describe('interactions', () => {
  let target: Window | HTMLElement
  let instance: InteractionEventEmitter

  beforeEach(function () {
    target = window.addEventListener ? window : document.body
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
