/* @flow */

import { timestamp, uniqueId } from './alias'
import { VERSION } from './constants'

const createRequsetBasePath = (baseUrl: string, projectId: string, clientId: string, loadTime: number) => {
  return `${baseUrl}/${VERSION}/${clientId}/${loadTime}/`
}

module.exports = class Core {
  base: string;
  constructor (projectId: string, baseUrl: string): void {
    this.base = createRequsetBasePath(
      baseUrl,
      projectId,
      uniqueId(),  // TODO store
      timestamp()  // TODO store
    )
  }
}
