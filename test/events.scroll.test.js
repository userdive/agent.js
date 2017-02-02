/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'

describe('scroll', () => {
  const Raven = require('raven-js')
  const mitt = require('mitt')
  const ScrollEvents = require('../src/events/scroll').default
  const Logger = require('../src/logger').default
  const UIEventObserver = require('ui-event-observer').UIEventObserver

  let instance

  beforeEach(() => {
    instance = new ScrollEvents(
      random.word(),
      mitt(),
      new UIEventObserver(),
      new Logger(Raven)
    )
  })

  it('validate', () => {
    assert(instance.validate())
  })

  it('on', () => {
    const spy = sinonSpy(instance, 'emit')
    instance.on()

    window.dispatchEvent(new Event('scroll'))

    assert(spy.called)
    spy.restore()
  })
})
