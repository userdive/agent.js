/* @flow */
import { NAMESPACE } from './constants'

type TaskQueue = any[]

export default function (agent: Object) {
  function execute (): any {
    const tasks = []
    tasks.push.apply(tasks, arguments)
    const apiName = tasks.shift()
    return agent[apiName].apply(this, tasks)
  }

  ((global: window) => {
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
