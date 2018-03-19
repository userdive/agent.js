import Agent from '@userdive/agent'
import Linker from '@userdive/linker'

const agent = new Agent('af57h6gb', 'auto')
agent.provide('linker', Linker)
agent.require('linker')
agent.run('linker', 'autoLink', ['developers.userdive.com'])
agent.send('pageview')
