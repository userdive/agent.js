import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'

import executerFactory from '../src/executer'
import { parseCommand } from '../src/command'

describe('command', () => {
  const name = lorem.word()
  it('parse create', () => {
    const command = parseCommand([`create.${name}`, random.alphaNumeric(), {}])
    assert(command.trackerName === name)
    assert(command.pluginName === '')
    assert(command.methodName === 'create')
    assert(command.callCreate)
  })

  it('parse provide', () => {
    const pluginName = lorem.word()
    const plugin = require('./helpers/plugin').default
    const command = parseCommand(['provide', pluginName, plugin])
    assert(command.methodName === 'provide')
    assert(command.callProvide)
  })

  it('parse require', () => {
    const name = lorem.word()
    const pluginName = lorem.word()
    const command = parseCommand([`require.${name}`, pluginName])
    assert(command.trackerName === name)
    assert(command.methodName === 'require')
    assert(command.callRequire)
  })

  it('parse plugin command', () => {
    const pluginName = lorem.word()
    const command = parseCommand([`${name}.${pluginName}:pluginFunction`])
    assert(command.trackerName === name)
    assert(command.pluginName === pluginName)
    assert(command.methodName === 'pluginFunction')
  })

  it('invalid command', () => {
    const plugin = require('./helpers/plugin').default
    assert.throws(() => {
      parseCommand([''])
    }, 'methodName is required')
    assert.throws(() => {
      parseCommand(['provide', false, plugin])
    }, 'provide name is string')
    assert.throws(() => {
      const name = lorem.word()
      parseCommand([`provide.${name}`, 'plugin', plugin])
    }, 'named provide not accept')
  })
})
