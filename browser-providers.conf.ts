export const customLaunchers = {
  SL_IOS10: { base: 'SauceLabs', browserName: 'iphone', version: '10.0' },
  SL_IOS11: { base: 'SauceLabs', browserName: 'iphone', version: '11.0' },
  SL_ANDROID5: { base: 'SauceLabs', browserName: 'android', version: '5.1' },
  SL_ANDROID6: {
    base: 'SauceLabs',
    browserName: 'Chrome',
    platform: 'Android',
    version: '6.0',
    device: 'Android Emulator'
  },
  SL_ANDROID7: {
    base: 'SauceLabs',
    browserName: 'Chrome',
    platform: 'Android',
    version: '7.1',
    device: 'Android GoogleAPI Emulator'
  },
  SL_CHROME46: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Linux',
    version: '46'
  },
  SL_CHROME_BETA: { base: 'SauceLabs', browserName: 'chrome', version: 'beta' },
  SL_FIREFOX: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '51'
  },
  // SL_SAFARI10: {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platform: 'OS X 10.12',
  //   version: '10.0'
  // },
  // SL_SAFARI11: {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platform: 'OS X 10.12',
  //   version: '10.0'
  // },
  SL_IE11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  }
  // SL_EDGE14: {
  //   base: 'SauceLabs',
  //   browserName: 'MicrosoftEdge',
  //   platform: 'Windows 10',
  //   version: '14.14393'
  // }
}
