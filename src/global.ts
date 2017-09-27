/* @flow */
import {NAMESPACE} from './constants'

type TaskQueue = any[]

export default function (Agent: any) {
  const agents = {}

  function execute (): any {
    const tasks = []
    tasks.push.apply(tasks, arguments)
    const api = tasks.shift().split('.')
    let name = 'default'
    if (api.length === 2) {
      name = api[1]
    }

    if (!agents[name]) {
      agents[name] = new Agent()
    }

    return agents[name][api[0]](...tasks)
  }

  ;((global: window) => {
    const element: any = document.querySelector(`[${NAMESPACE}]`)
    const name: string = element.getAttribute(NAMESPACE)
    if (global[name] && global[name].q) {
      const queue = (global[name].q: Array<TaskQueue>)
      for (let i = 0; i < queue.length; i++) {
        execute.apply(this, queue[i])
      }
      global[name] = execute
    }
  })(window)
}
