/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import assert from 'assert'

describe('scroll', () => {
  const Raven = require('raven-js')
  const mitt = require('mitt')
  const ScrollEvents = require('../src/events/scroll').default
  const Logger = require('../src/logger').default
  const UIEventObserver = require('ui-event-observer').UIEventObserver

  let instance, emitter

  beforeEach(() => {
    emitter = mitt()
    instance = new ScrollEvents(
      random.word(),
      emitter,
      new UIEventObserver(),
      new Logger(Raven)
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
