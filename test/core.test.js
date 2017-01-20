/* @flow */
import { describe, it, beforeEach } from 'mocha'
import assert from 'assert'
import { random, internet } from 'faker'

describe('core', () => {
  const Agent = require('../src/core').default
  const Base = require('@userdive/events').Base
  const Raven = require('../src/constants').OPTIONS.Raven

  let agent
  beforeEach(() => {
    class Events extends Base {
      bind () {
        super.bind(document, 'click', e => {
          this.change({x: e.pageX, y: e.pageY})
        })
      }
    }

    agent = new Agent(
      random.alphaNumeric(),
      [
        Events
      ],
      {
        baseUrl: internet.url(),
        cookieName: random.alphaNumeric(),
        cookieDomain: random.alphaNumeric(),
        cookieExpires: 0,
        Raven: Raven
      }
    )
  })

  it('instance', () => {
    assert(agent)
  })

  it('before ', () => {
    assert(agent.listen() === undefined, 'noting todo')
  })

  it('send', () => {
    agent.send('pageview', location.pathname)
  })

  it('destroy', () => {
    agent.destroy()
  })

  it('listen', () => {
    assert(agent.listen() === undefined, 'noting todo when before load')

    agent.loaded = true
    agent.listen()
    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    document.dispatchEvent(e)
  })
})
