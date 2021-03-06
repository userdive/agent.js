import Agent from '@userdive/agent'

export default class Plugin {
  private tracker: Agent
  private isSent: boolean
  public constructor(tracker: Agent) {
    this.tracker = tracker
    this.isSent = false
  }

  public getVariation(global = window as any, interval = 200, max = 10) {
    let tryCount = 0
    const pollingForReady = (): void => {
      if (typeof global._vwo_exp_ids !== 'undefined') {
        const sendEvent = this.sendEvents(
          global,
          global._vwo_exp_ids,
          global._vwo_exp
        )
        global._vis_opt_queue.push(sendEvent)
      }
      if (tryCount < max && !this.isSent) {
        tryCount++
        setTimeout(pollingForReady, interval)
      }
    }

    pollingForReady()
  }

  private sendEvents = (global: any, vwoExpIds: string[], vwoExp: any) => {
    return () => {
      try {
        if (vwoExpIds.length === 0 || this.isSent) {
          return
        }
        for (let i = 0; i < vwoExpIds.length; i++) {
          const visId: string = vwoExpIds[i]
          const exp = vwoExp[parseInt(vwoExpIds[i], 10)]
          if (!exp.ready) {
            continue
          }
          const visCombination: string =
            typeof exp.combination_chosen !== 'undefined'
              ? exp.combination_chosen
              : global._vis_opt_readCookie(`_vis_opt_exp_${visId}_combi`)
          if (typeof exp.comb_n[visCombination] !== 'undefined') {
            this.tracker.send('event', {
              eventCategory: 'vwo',
              eventAction: visId,
              eventLabel: visCombination,
            })
            this.isSent = true
          }
        }
      } catch (e) {
        // do nothing
      }
    }
  }
}
