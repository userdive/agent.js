import Agent from '@userdive/agent'
import { linkHandler, submitHandler } from './handler'

export default class Linker {
  private param: { [key: string]: string }
  constructor (agent: Agent) {
    this.param = agent.getLinkParam()
  }

  autoLink (domains: any[]) {
    const linkListener: EventListenerOrEventListenerObject = linkHandler(
      domains,
      this.param
    )
    const events: string[] = ['mousedown', 'keyup']
    events.forEach(event => {
      this.setListener(event, linkListener, false)
    })
    this.setListener('submit', submitHandler(domains, this.param), false)
  }

  setListener (
    event: any,
    listener: EventListenerOrEventListenerObject,
    options: any
  ) {
    const d: any = document
    d.addEventListener
      ? d.addEventListener(event, listener, options)
      : d.attachEvent && d.attachEvent(`on${event}`, listener)
  }
}
