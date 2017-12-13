import { NAMESPACE } from './constants'
import executerFactory from './executer'

type TaskQueue = any[]

export default function (Agent: any) {
  const exe = executerFactory(Agent)

  function execute (): any {
    exe.run.apply(exe, arguments)
  }

  ((global: any) => {
    const element: any = document.querySelector(`[${NAMESPACE}]`)
    const name: string = element.getAttribute(NAMESPACE)
    if (global[name] && global[name].q) {
      const queue: TaskQueue[] = global[name].q
      for (let i = 0; i < queue.length; i++) {
        exe.run.apply(this, queue[i])
      }
      global[name] = execute
    }
  })(window)
}
