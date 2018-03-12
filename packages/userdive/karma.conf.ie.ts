import { setting } from '../../karma.conf.base'

module.exports = function (config: any) {
  setting.browsers = ['IE_no_addons']
  config.set(setting)
}
