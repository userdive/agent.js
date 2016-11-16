/* @flow */
import { setup } from './store'

module.exports = class Core {
  constructor (projectId: string, baseUrl: string): void {
    setup(projectId, baseUrl)
  }
}
