import Agent from '@userdive/agent'

export default class Plugin {
  private tracker: Agent
  private isSent: boolean
  private tryCount: number
  constructor (tracker: Agent) {
    this.tracker = tracker
    this.init()
  }

  public init = () => {
    this.isSent = false
    this.tryCount = 0
  }

  public getVariation (global?: any, interval?: number, max?: number) {
    global = global || window
    const sendVariation = (q: any[], vwoExpIds: string[], vwoExp: any[]) => {
      const sendEvent = this.sendEvent(global, vwoExpIds, vwoExp)
      q.push(sendEvent)
    }
    const pollingForReady = (): void => {
      interval = interval || 200
      max = max || 10
      if (typeof global._vwo_exp_ids !== 'undefined') {
        sendVariation(
          global._vis_opt_queue,
          global._vwo_exp_ids,
          global._vwo_exp
        )
        if (this.tryCount < max && !this.isSent) {
          this.tryCount++
          setTimeout(pollingForReady, interval)
        }
      }
    }

    pollingForReady()
  }

  private sendEvent = (global: any, vwoExpIds: string[], vwoExp: any[]) => {
    return () => {
      try {
        for (let i = 0; i < vwoExpIds.length; i++) {
          const visId: string = vwoExpIds[i]
          const exp = vwoExp[parseInt(vwoExpIds[i], 10)]
          if (!exp.ready) {
            continue
          }
          const visCombination: string = (typeof exp.combination_chosen !== 'undefined') ?
          exp.combination_chosen : global._vis_opt_readCookie(`_vis_opt_exp_${visId}_combi`)
          if (typeof exp.comb_n[visCombination] !== 'undefined') {
            this.isSent = true
            this.tracker.send('event', {
              eventCategory: 'vwo',
              eventAction: visCombination,
              eventLabel: visId
            })
          }
        }
      } catch (e) {
        // do nothing
      }
    }
  }
}
