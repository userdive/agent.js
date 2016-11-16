/* @flow */
import { project } from './store'

module.exports = class Core {
  constructor (projectId: string, baseUrl: string): void {
    project(projectId, baseUrl)
  }
}
