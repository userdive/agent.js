import Agent from '@userdive/agent'
import { LINKER } from '@userdive/agent/lib/constants'
import MethodChain from 'autotrack/lib/method-chain'
import { linkHandler, submitHandler } from './handler'

export default class Linker {
  private agent: Agent
  constructor (agent: Agent) {
    this.agent = agent
    const cb = () => {
      this.agent.core.observer.unsubscribeAll()
      MethodChain.remove(this.agent.core, 'destory', cb)
    }
    MethodChain.add(this.agent.core, 'destory', cb)
  }

  autoLink (domains: string[]) {
    const events: string[] = ['mousedown', 'keyup']
    const param: any = {}
    param[LINKER] = this.agent.getLinkParam()
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
