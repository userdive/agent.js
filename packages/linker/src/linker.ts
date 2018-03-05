import Agent from '@userdive/agent'
import { LINKER } from '@userdive/agent/lib/constants'
import { linkHandler, submitHandler } from './handler'

export default class Linker {
  private agent: Agent
  constructor (agent: Agent) {
    this.agent = agent
  }

  getParam (): { [LINKER]: string } {
    return { _ud: this.agent.getLinkParam() as string }
  }

  autoLink (domains: string[]) {
    const events: string[] = ['mousedown', 'keyup']
    const param = this.getParam()
    events.forEach((event: string) =>
      this.agent.core.observer.subscribe(
        document,
        event,
        linkHandler(domains, param)
      )
    )
    this.agent.core.observer.subscribe(
      document,
      'submit',
      submitHandler(domains, param)
    )
  }
}
