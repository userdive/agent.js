/* @flow */

const customLauncherPC = {
  'SL_CHROME': {base: 'SauceLabs', browserName: 'chrome', version: '54'},
  // 'SL_EDGE': {base: 'SauceLabs', browserName: 'MicrosoftEdge', platform: 'Windows 10', version: '13.10586'},
  // 'SL_FIREFOX': {base: 'SauceLabs', browserName: 'firefox', version: '50'},
  // 'SL_IE10': {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 2012', version: '10'},
  // 'SL_IE11': {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 8.1', version: '11'},
  // 'SL_IE9': {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 2008', version: '9'},
  // 'SL_SAFARI10': {base: 'SauceLabs', browserName: 'safari', platform: 'OS X 10.12', version: '10.0'},
  'SL_SAFARI7': {base: 'SauceLabs', browserName: 'safari', platform: 'OS X 10.9', version: '7.0'}
  // 'SL_SAFARI8': {base: 'SauceLabs', browserName: 'safari', platform: 'OS X 10.10', version: '8.0'},
  // 'SL_SAFARI9': {base: 'SauceLabs', browserName: 'safari', platform: 'OS X 10.11', version: '9.0'}
}

const customLauncherSP = {
  // 'SL_ANDROID4.1': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '4.1'},
  // 'SL_ANDROID4.2': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '4.2'},
  // 'SL_ANDROID4.3': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '4.3'},
  // 'SL_ANDROID4.4': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '4.4'},
  // 'SL_ANDROID5': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '5.1'},
  'SL_IOS10': {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.10', version: '10.0'}
  // 'SL_IOS7': {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.10', version: '7.1'},
  // 'SL_IOS8': {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.10', version: '8.4'},
  // 'SL_IOS9': {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.10', version: '9.3'}
}

module.exports = {
  customLaunchers: Object.assign({}, customLauncherPC, customLauncherSP),
  customLauncherPC,
  customLauncherSP
}
