/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import assert from 'assert'

import EventEmitter from 'events'
import { UIEventObserver } from 'ui-event-observer'
import { createEvent } from './helpers/Event'
import { isIE11 } from './helpers/browser'

function itExcludeIE (): Function {
  return isIE11() ? it.skip : it
}

describe.skip('scroll', () => {
  const ScrollEvents = require('../src/events/scroll').default

  let instance, emitter

  beforeEach(() => {
    emitter = new EventEmitter()
    instance = new ScrollEvents(random.word(), emitter, new UIEventObserver())
  })

  it('validate', () => {
    assert(instance.validate())
  })

  itExcludeIE()('on', () => {
    let data: any = {}
    emitter.on(instance.name, res => {
      data = res
    })
    instance.on()

    window.dispatchEvent(createEvent('scroll'))
    assert(typeof data.x === 'number')
    assert(typeof data.y === 'number')
    assert(typeof data.left === 'number')
    assert(typeof data.top === 'number')
    assert(data.type === 'scroll')

    emitter.removeListener(instance.name, res => {
      data = res
    })
  })
})
