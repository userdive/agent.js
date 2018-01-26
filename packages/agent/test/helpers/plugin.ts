import Agent from '../../src/agent'

export default class DummyPlugin {
  private agent: Agent
  private id: string
  constructor (agent: Agent, options: any) {
    this.agent = agent
    this.id = options.id || 'testid'
  }
  injectLocation (location: string) {
    this.agent.set('page', location)
  }
}
