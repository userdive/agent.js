import Agent from '@userdive/agent'
import { linkHandler, submitHandler } from './handler'

export default class Linker {
  private agent: Agent
  constructor (agent: Agent) {
    this.agent = agent
  }

  autoLink (domains: any[], decorateForms?: boolean) {
    ['mousedown', 'keyup'].forEach(event => {
      this.setListener(event, linkHandler(domains, this.agent), false)
    })
    this.setListener('submit', submitHandler(domains, this.agent), false)
  }

  setListener (
    event: any,
    listener: EventListenerOrEventListenerObject,
    options: any
  ) {
    if (document.addEventListener) {
      document.addEventListener(event, listener, options)
    }
  }
}
