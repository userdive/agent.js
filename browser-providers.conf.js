/* @flow */

const customLaunchers = {
  'SL_CHROME': {base: 'SauceLabs', browserName: 'chrome', version: '56'},
  'SL_CHROME_BETA': {base: 'SauceLabs', browserName: 'chrome', version: 'beta'},
  'SL_EDGE': {base: 'SauceLabs', browserName: 'MicrosoftEdge', version: '13'},
  'SL_FIREFOX': {base: 'SauceLabs', browserName: 'firefox', version: '51'},
  'SL_FIREFOX_BETA': {base: 'SauceLabs', browserName: 'firefox', version: 'beta'},
  'SL_IE11': {base: 'SauceLabs', browserName: 'internet explorer', version: '11'},
  'SL_SAFARI10': {base: 'SauceLabs', browserName: 'safari', version: '10.0'},
  'SL_ANDROID4.4': {base: 'SauceLabs', browserName: 'android', version: '4.4'},
  'SL_ANDROID5': {base: 'SauceLabs', browserName: 'android', version: '5.1'},
  'SL_IOS10': {base: 'SauceLabs', browserName: 'iphone', version: '10.0'}
}

module.exports = {
  customLaunchers
}
