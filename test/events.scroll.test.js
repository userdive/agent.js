/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import assert from 'assert'

import mitt from 'mitt'
import { UIEventObserver } from 'ui-event-observer'

describe('scroll', () => {
  const ScrollEvents = require('../src/events/scroll').default

  let instance, emitter

  beforeEach(() => {
    emitter = mitt()
    instance = new ScrollEvents(
      random.word(),
      emitter,
      new UIEventObserver()
    )
  })

  it('validate', () => {
    assert(instance.validate())
  })

  it('on', () => {
    let data: any = {}
    emitter.on(instance.name, res => { data = res })
    instance.on()

    window.dispatchEvent(new Event('scroll'))
    assert(typeof data.x === 'number')
    assert(typeof data.y === 'number')
    assert(typeof data.left === 'number')
    assert(typeof data.top === 'number')
    assert(data.type === 'scroll')

    emitter.off('*', res => { data = res })
  })
})
