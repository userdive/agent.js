/* @flow */
import { getBaseUrl, getEnv } from './store'
import { sendBeacon } from './alias'

const env = () => {
  sendBeacon(`${getBaseUrl()}/env`, getEnv())
}

module.exports = {
  env
}
