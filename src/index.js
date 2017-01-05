/* @flow */
import api from './api'
import { NAMESPACE } from './constants'

type TaskQueue = any[]

function execute (): any {
  const tasks = []
  tasks.push.apply(tasks, arguments)
  const apiName = tasks.shift()
  return api[apiName].apply(this, tasks)
}

((global: any) => {
  const element: any = document.querySelector(`[${NAMESPACE}]`)
  if (!element) {
    return
  }
  const name: string = element.getAttribute(NAMESPACE)
  if (global[name] && global[name].q) {
    const queue = (global[name].q: Array<TaskQueue>)
    for (let i = 0; i < queue.length; i++) {
      execute.apply(this, queue[i])
    }
    global[name] = execute
  }
})(window)

export default api
