import Agent from '@userdive/agent'
import { q } from 'userdive'

export default class Plugin {
  tracker: Agent
  constructor (tracker: Agent) {
    this.tracker = tracker
  }
  getVariation () {
    (q('kzs', window) as any)(
      'getVariation',
      (
        data: { experimentType: string; variationId: string },
        state: string
      ) => {
        try {
          if (state === 'decided') {
            this.tracker.send('event', {
              eventCategory: 'kaizenplatform',
              eventAction: data.experimentType,
              eventLabel: data.variationId
            })
          }
        } catch (e) {
          // Do nothing
        }
      }
    )
  }
}
