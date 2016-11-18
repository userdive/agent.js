/* @flow */
import api from './api'

type TaskQueue = any[]

function execute (): any {
  const tasks = []
  tasks.push.apply(tasks, arguments)
  const apiName = tasks.shift()
  return api[apiName].apply(this, tasks)
}

((global: any) => {
  if (global && global.q) {
    const queue = (global.q: Array<TaskQueue>)
    for (const args of queue) {
      execute.apply(this, args)
    }
    global = execute
  }
})(window.USERDIVEObject)

module.exports = api
