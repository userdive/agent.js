import Agent from '@userdive/agent'

export default class Plugin {
  tracker: Agent
  constructor (tracker: Agent) {
    this.tracker = tracker
  }

  getVariation (global: any, pollInterval?: number, maxTry?: number) {
    const interval: number = pollInterval || 200
    const max: number = maxTry || 10
    let isSent = false
    let tryCount = 0
    const sendVariation = (q: any[], vwoExpIds: string[], vwoExp: any[]) => {
      const sendEvent = () => {
        try {
          for (let i = 0; i < vwoExpIds.length; i++) {
            const visId: string = vwoExpIds[i]
            const exp = vwoExp[parseInt(vwoExpIds[i], 10)]
            if (!exp.ready) {
              continue
            }
            let visCombination: string = global._vis_opt_readCookie(
              '_vis_opt_exp_' + visId + '_combi'
            )
            if (typeof exp.combination_chosen !== 'undefined') {
              visCombination = exp.combination_chosen
            }
            if (typeof exp.comb_n[visCombination] !== 'undefined') {
              isSent = true
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
      q.push(sendEvent)
    }

    const pollingForReady = (): void => {
      if (typeof global._vwo_exp_ids !== 'undefined') {
        sendVariation(
          global._vis_opt_queue,
          global._vwo_exp_ids,
          global._vwo_exp
        )
        if (tryCount < max && !isSent) {
          tryCount++
          setTimeout(pollingForReady, interval)
        }
      }
    }

    pollingForReady()
  }
}
