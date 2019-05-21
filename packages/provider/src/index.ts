import { namespace, q } from 'userdive'

export default function(pluginName: string, pluginConstructor: any): any {
  const element = document.querySelector(`[${namespace}]`) as HTMLElement
  return q(element.getAttribute(namespace) as string, window)(
    'provide',
    pluginName,
    pluginConstructor
  )
}
