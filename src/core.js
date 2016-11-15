/* @flow */

import { timestamp, uniqueId } from './alias'
import { VERSION } from './constants'

const createRequsetBasePath = (projectId: string, clientId: string, loadTime: number, domain: string) => {
  return `${domain}/${VERSION}/${clientId}/${loadTime}/`
}

module.exports = class Core {
  base: string;
  constructor (projectId: string, domain: string): void {
    this.base = createRequsetBasePath(
      projectId,
      uniqueId(),  // TODO store
      timestamp(),  // TODO store
      domain
    )
  }
}
