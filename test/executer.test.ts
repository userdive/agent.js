import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'

import Agent from '../src/agent'
import Executer from '../src/executer'

describe('executer', () => {
  let executer
  beforeEach('initialize executer', () => {
    executer = new Executer(Agent)
  })

  it('run', () => {
    const name = lorem.word()
    assert.equal(Object.keys(executer.agents).length, 0)
    executer.run([`create.${name}`, random.alphaNumeric(), {}])
    assert.equal(Object.keys(executer.agents).length, 1)
    assert.equal(executer.commandQueue.length, 0)
  })

  it('block dequeue', () => {
    const name = lorem.word()
    const pluginName = lorem.word()
    executer.run([`create.${name}`, random.alphaNumeric(), {}])
    executer.run([`require.${name}`, pluginName])
    executer.run([`send.${name}`, 'pageview'])
    assert.equal(executer.commandQueue.length, 2)

    const plugin = require('./helpers/plugin').default
    executer.run(['provide', pluginName, plugin])
    assert(executer.agents[name].plugins[pluginName])
    assert.equal(executer.commandQueue.length, 0)

    const l: string = internet.url()
    executer.run([`run.${name}`, pluginName, 'injectLocation', l])
    const agent: Agent = executer.agents[name]
    assert(agent.core.get('env')['l'] === l)
  })

  it('thorow error if invalid command execute', () => {
    const pluginName = lorem.word()
    executer.run(['create', random.alphaNumeric(), {}])
    assert.throws(() => {
      executer.run([`${pluginName}:injectLocation`, internet.url()])
    })
  })
})
