import {
  namespace,
  q // data-ud-namespace
} from 'userdive'
import { MyPlugin } from './'

try {
  const element = document.querySelector(`[${namespace}]`) as HTMLElement
  const name = element.getAttribute(namespace) as string
  if (name) {
    q(name, window)('provide', 'myplugin', MyPlugin)
  }
} catch (e) {
  // not found agent.js snipet
}
