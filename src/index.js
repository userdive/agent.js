/* @flow */
import api from './api'

type TaskQueue = any[]

function execute (): any {
  const tasks = []
  tasks.push.apply(tasks, arguments)
  const apiName = tasks.shift()
  return api[apiName].apply(this, tasks)
}

((global: any, name: string) => {
  if (global[name] && global[name].q) {
    const queue = (global[name].q: Array<TaskQueue>)
    console.log(queue)
    for (let i = 0; i < queue.length; i++) {
      execute.apply(this, queue[i])
    }
    global[name] = execute
  }
})(window, window.USERDIVEObject)

module.exports = api
