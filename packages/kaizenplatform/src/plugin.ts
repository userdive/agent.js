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
      ({ variationId }: { variationId: string }, state: string) => {
        try {
          if (state === 'decided') {
            this.tracker.send('event', {
              eventCategory: 'kaizenplatform',
              eventLabel: `?_kzs_var_id=${variationId}`
            })
          }
        } catch (e) {
          // Do nothing
        }
      }
    )
  }
}
