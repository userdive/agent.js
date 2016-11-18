/* @flow */
import { getBaseUrl, getEnv, initialView } from './store'
import { xhr } from './alias'

function env (): void {
  initialView()
  const client = xhr()
  client.open('GET', `${getBaseUrl()}/env.gif`, true)
  client.send(getEnv())
}

module.exports = {
  env
}
