/* @flow */
import { setup } from './store'
import { env as sendEnv } from './requests'

module.exports = class Core {
  constructor (projectId: string, baseUrl: string): void {
    setup(projectId, baseUrl)
  }
  send (type: string, pathname: string) {
    switch (type) {
      case 'pageviews':
        sendEnv()
    }
  }
}
