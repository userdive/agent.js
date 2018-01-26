import { NAMESPACE } from './constants'
import Executer from './executer'

type TaskQueue = any[]

export default function (Agent: any) {
  const exe = new Executer(Agent)

  function execute (): any {
    return exe.run(arguments)
  }

  ((global: any) => {
    const element: any = document.querySelector(`[${NAMESPACE}]`)
    const name: string = element.getAttribute(NAMESPACE)
    if (global[name] && global[name].q) {
      const queue: TaskQueue[] = global[name].q
      for (let i = 0; i < queue.length; i++) {
        exe.run(queue[i])
      }
      global[name] = execute
    }
  })(window)
}
