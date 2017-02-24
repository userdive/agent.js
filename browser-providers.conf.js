/* @flow */

const customLaunchers = {
  'SL_CHROME': {base: 'SauceLabs', browserName: 'chrome', version: '56'},
  'SL_EDGE': {base: 'SauceLabs', browserName: 'MicrosoftEdge', platform: 'Windows 10', version: '13'},
  'SL_FIREFOX': {base: 'SauceLabs', browserName: 'firefox', version: '51'},
  'SL_IE11': {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 10', version: '11'},
  'SL_SAFARI10': {base: 'SauceLabs', browserName: 'safari', platform: 'OS X 10.12', version: '10.0'},
  'SL_ANDROID4.4': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '4.4'},
  'SL_ANDROID5': {base: 'SauceLabs', browserName: 'android', platform: 'Linux', version: '5.1'},
  'SL_IOS10': {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.10', version: '10.0'}
}

module.exports = {
  customLaunchers
}
