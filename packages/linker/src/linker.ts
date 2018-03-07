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
      this.agent.core.observer.subscribe(document, event, link(domains, param))
    )
    this.agent.core.observer.subscribe(
      document,
      'submit',
      submit(domains, param)
    )
  }
}
