/* @flow */
import api from './api'

type TaskQueue = any[]

function execute (): any {
  const tasks = []
  tasks.push.apply(tasks, arguments)
  const apiName = tasks.shift()
  return api[apiName].apply(this, tasks)
}

((global: any, name) => {
  if (global[name] && global[name].q) {
    const queue = (global[name].q: Array<TaskQueue>)
    for (const args of queue) {
      execute.apply(this, args)
    }
    global[name] = execute
  }
})(window, window.USERDIVEObject)

module.exports = api
