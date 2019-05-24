import Agent from '@userdive/agent'

export const name = 'optimizely'

export class Plugin {
  private tracker: Agent
  private isSent: boolean
  public constructor(tracker: Agent) {
    this.tracker = tracker
    this.isSent = false
  }

  public getVariation(global = window as any, interval = 100, max = 3) {
    let tryCount = 0
    const pollingForReady = (): void => {
      if (typeof global[name] !== 'undefined') {
        const campaignStates = global[name]
          .get('state')
          .getCampaignStates({ isActive: true })
        this.sendEvents(campaignStates)
      }
      if (tryCount < max && !this.isSent) {
        tryCount++
        setTimeout(pollingForReady, interval)
      }
    }
    pollingForReady()
  }

  private sendEvents = (campaignStates: { [campaignId: string]: any }) => {
    try {
      const campaignIds = Object.keys(campaignStates)
      if (campaignIds.length === 0 || this.isSent) {
        return
      }
      campaignIds.forEach(campaignId => {
        const experimentId: string =
          campaignStates[campaignId].experiment.id || ''
        const variationId: string =
          campaignStates[campaignId].variation.id || ''
        if (experimentId !== '' || variationId !== '') {
          this.tracker.send('event', {
            eventCategory: name,
            eventAction: experimentId,
            eventLabel: variationId,
          })
          this.isSent = true
        }
      })
    } catch (e) {
      // do nothing
    }
  }
}
