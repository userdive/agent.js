/* @flow */

const customLaunchers = {
  'SL_CHROME': {base: 'SauceLabs', browserName: 'chrome', version: '56'},
  'SL_CHROME_BETA': {base: 'SauceLabs', browserName: 'chrome', version: 'beta'},
  'SL_EDGE': {base: 'SauceLabs', browserName: 'MicrosoftEdge', platform: 'Windows 10', version: '13'},
  'SL_FIREFOX': {base: 'SauceLabs', browserName: 'firefox', platform: 'Windows 10', version: '51'},
  'SL_IE11': {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 8.1', version: '11'},
  'SL_SAFARI7': {base: 'SauceLabs', browserName: 'safari', platform: 'OS X 10.9', version: '7.0'},
  'SL_SAFARI10': {base: 'SauceLabs', browserName: 'safari', platform: 'OS X 10.11', version: '10.0'},
  'SL_ANDROID4.4': {base: 'SauceLabs', browserName: 'android', version: '4.4'},
  'SL_ANDROID5': {base: 'SauceLabs', browserName: 'android', version: '5.1'},
  'SL_IOS10': {base: 'SauceLabs', browserName: 'iphone', version: '10.0'}
}

module.exports = {
  customLaunchers
}
