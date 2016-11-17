/* @flow */
import { getBaseUrl, getEnv, initialView } from './store'
import { sendBeacon } from './alias'

const env = () => {
  initialView()
  sendBeacon(`${getBaseUrl()}/env`, getEnv())
}

module.exports = {
  env
}
