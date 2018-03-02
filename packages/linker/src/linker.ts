import Agent from '@userdive/agent'
import { LINKER } from '@userdive/agent/lib/constants'
import { AgentEvent } from '@userdive/agent/lib/event'
import { linkHandler, submitHandler } from './handler'

const factory = (id: string, domains: string[]): AgentEvent => {
  return class LinkerEvent implements AgentEvent {
    observer: any
    constructor ({ observer }: { observer: any }) {
      this.observer = observer
    }
    on () {
      const linkListener: EventListenerOrEventListenerObject = linkHandler(
        domains,
        { [LINKER]: id }
      )
      const events: string[] = ['mousedown', 'keyup']
      events.forEach(event => {
        this.observer.subscribe(event, linkListener, false)
      })
      this.observer.subscribe(
        'submit',
        submitHandler(domains, { [LINKER]: id }),
        false
      )
    }
  }
}

export default class Linker {
  private agent: Agent
  constructor (agent: Agent) {
    this.agent = agent
  }

  autoLink (domains: any[]) {
    this.agent.bind(factory(this.agent.getLinkParam(), domains))
  }
}
