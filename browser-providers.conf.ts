export const customLaunchers = {
  SL_IOS_NEXT_MOST_RECENT: {
    base: 'SauceLabs',
    browserName: 'iphone',
    version: 'latest-1'
  },
  SL_IOS_LATEST: {
    base: 'SauceLabs',
    browserName: 'iphone',
    version: 'latest'
  },
  SL_ANDROID_5: {
    base: 'SauceLabs',
    browserName: 'android',
    version: '5.1'
  },
  SL_ANDROID_NEXT_MOST_RECENT: {
    base: 'SauceLabs',
    browserName: 'Chrome',
    platform: 'Android',
    version: 'latest-1',
    device: 'Android Emulator'
  },
  SL_ANDROID_LATEST: {
    base: 'SauceLabs',
    browserName: 'Chrome',
    platform: 'Android',
    version: 'latest',
    device: 'Android GoogleAPI Emulator'
  },
  SL_CHROME_LINUX_LATEST: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Linux',
    version: 'latest'
  },
  // TODO: Revert to beta version after pass tests
  SL_CHROME_BETA: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 8',
    version: 'latest'
  },
  SL_FIREFOX_58: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '58'
  },
  SL_FIREFOX_BETA: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
    version: 'beta'
  },
  SL_SAFARI_NEXT_MOST_RECENT: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.13',
    version: 'latest-1'
  },
  SL_SAFARI_LATEST: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.13',
    version: 'latest'
  },
  SL_IE_LATEST: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: 'latest'
  },
  SL_EDGE_LATEST: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: 'latest'
  }
}
