import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'

import executerFactory from '../src/executer'
import Agent from '../src/agent'

describe('executer', () => {
  let executer
  beforeEach('initialize executer', () => {
    executer = executerFactory(Agent)
  })

  it('run', () => {
    const name = lorem.word()
    assert.equal(Object.keys(executer.agents).length, 0)
    executer = executer.run(['create', random.alphaNumeric(), {}])
    assert.equal(Object.keys(executer.agents).length, 1)
    executer = executer.run([`create.${name}`, random.alphaNumeric(), {}])
    assert.equal(Object.keys(executer.agents).length, 2)
    assert.equal(executer.commandQueue.length, 0)
  })

  it('block dequeue', () => {
    const pluginName = lorem.word()
    executer.run(['create', random.alphaNumeric(), {}])
    executer.run(['require', pluginName])
    executer = executer.run(['send', 'pageview'])
    assert.equal(executer.commandQueue.length, 2)

    const plugin = require('./helpers/plugin').default
    executer = executer.run(['provide', pluginName, plugin])
    assert(window['_udplugins'][pluginName])
    assert.equal(executer.commandQueue.length, 0)

    const n: number = random.number()
    executer.run([`${pluginName}:injectNumber`, n])
    assert(window['checkNumber'] === n)
  })
})
