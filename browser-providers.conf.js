/* @flow */

const customLaunchers = {
  'SL_IOS10': {base: 'SauceLabs', browserName: 'iphone', version: '10.0'},
  'SL_IOS9': {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.10', version: '9.3'},
  'SL_ANDROID4.4': {base: 'SauceLabs', browserName: 'android', version: '4.4'},
  'SL_ANDROID5': {base: 'SauceLabs', browserName: 'android', version: '5.1'},
  'SL_CHROME46': {base: 'SauceLabs', browserName: 'chrome', platform: 'Linux', version: '46'},
  'SL_CHROME_BETA': {base: 'SauceLabs', browserName: 'chrome', version: 'beta'},
  'SL_FIREFOX': {base: 'SauceLabs', browserName: 'firefox', platform: 'Linux', version: '44'},
  // 'SL_SAFARI10': {base: 'SauceLabs', browserName: 'safari', version: '10.0'},
  // 'SL_IE11': {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 8.1', version: '11'},
  'SL_EDGE': {base: 'SauceLabs', browserName: 'MicrosoftEdge', platform: 'Windows 10', version: '14'}
}

module.exports = {
  customLaunchers
}
