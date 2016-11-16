/* @flow */
import { setup, size } from './store'
import { env } from './requests'

module.exports = class Core {
  constructor (projectId: string, baseUrl: string): void {
    setup(projectId, baseUrl)
  }
  send (type: string, pathname: string) {
    switch (type) {
      case 'pageviews':
        size()
        env()
    }
  }
}
