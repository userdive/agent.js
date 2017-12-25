import Agent from '../../src/agent'

export default class DummyPlugin {
  private id: string
  constructor (agent: Agent, options: any) {
    this.id = options.id || 'testid'
  }
  injectNumber (num: number) {
    window[this.id] = num
  }
}
