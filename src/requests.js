/* @flow */
import { createEnvRequestUrl, initialView } from './store'
import { xhr } from './alias'

function env (): void {
  initialView()
  const client = xhr()
  client.open('GET', createEnvRequestUrl(), true)
  client.send()
}

module.exports = {
  env
}
