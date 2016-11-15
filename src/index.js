/* @flow */
import api from './api'

declare var window: {
  USERDIVEObject: string;
};

type TaskQueue = any[]

function execute (): void {
  const tasks = []
  tasks.push.apply(tasks, arguments)
  const apiName = tasks.shift()
  api[apiName].apply(this, tasks)
}

((global) => {
  if (global.USERDIVEObject && global[global.USERDIVEObject]) {
    const queue: Array<TaskQueue> = global[global.USERDIVEObject].q
    for (const args of queue) {
      execute.apply(this, args)
    }
    global[global.USERDIVEObject] = execute
  }
})(window)

module.exports = api
