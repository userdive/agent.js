import { createSettings } from '../../karma.conf'
export default (config: any) => {
  const setting = createSettings()
  setting.frameworks.push('fixture')
  config.set(setting)
}
