import * as assert from 'assert'
import { internet, lorem, random } from 'faker'
import 'mocha'

import Agent from '../src/agent'
import executerFactory from '../src/executer'

describe('executer', () => {
  let executer
  beforeEach('initialize executer', () => {
    executer = executerFactory(Agent)
  })

  it('run', () => {
    const name = lorem.word()
    assert.equal(Object.keys(executer.agents).length, 0)
    executer = executer.run([`create.${name}`, random.alphaNumeric(), {}])
    assert.equal(Object.keys(executer.agents).length, 1)
    assert.equal(executer.commandQueue.length, 0)
  })

  it('block dequeue', () => {
    const name = lorem.word()
    const pluginName = lorem.word()
    executer.run([`create.${name}`, random.alphaNumeric(), {}])
    executer.run([`require.${name}`, pluginName])
    executer = executer.run([`send.${name}`, 'pageview'])
    assert.equal(executer.commandQueue.length, 2)

    const plugin = require('./helpers/plugin').default
    executer = executer.run(['provide', pluginName, plugin])
    console.log(executer.agents)
    assert(executer.agents[name].plugins[pluginName])
    assert.equal(executer.commandQueue.length, 0)

    const l: string = internet.url()
    executer.run([`${name}.${pluginName}:injectLocation`, l])
    const agent: Agent = executer.agents[name]
    assert(agent.getCore().get('env')['l'] === l)
  })

  it('thorow error if invalid command execute', () => {
    const pluginName = lorem.word()
    executer.run(['create', random.alphaNumeric(), {}])
    assert.throws(() => {
      executer.run([`${pluginName}:injectLocation`, internet.url()])
    })
  })
})
