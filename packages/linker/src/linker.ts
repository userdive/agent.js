import Agent from '@userdive/agent'
import { link, submit } from './handler'

export default class Linker {
  private agent: Agent
  constructor (agent: Agent) {
    this.agent = agent
  }

  autoLink (domains: string[]) {
    const events: string[] = ['mousedown', 'keyup']
    const param = this.agent.get('linkerParam')
    events.forEach((event: string) =>
      this.agent.subscribe(document, event, link(domains, param, 100))
    )
    this.agent.subscribe(document, 'submit', submit(domains, param))
  }
}
