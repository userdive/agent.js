export const customLaunchers = {
  iPhoneXIOS11: {
    base: 'BrowserStack',
    device: 'iPhone X',
    os: 'ios',
    os_version: '11.0',
    real_mobile: 'true'
  },
  iPhone7IOS10: {
    base: 'BrowserStack',
    device: 'iPhone 7',
    os: 'ios',
    os_version: '10.0',
    real_mobile: 'true'
  },
  pixelAndroid8: {
    base: 'BrowserStack',
    device: 'Google Pixel',
    os: 'android',
    os_version: '8.0',
    real_mobile: 'true'
  },
  chrome: {
    base: 'BrowserStack',
    browser: 'chrome',
    browser_version: '67.0',
    os: 'Windows',
    os_version: '10',
    resolution : '1366x768'
  },
  firefox: {
    base: 'BrowserStack',
    browser: 'firefox',
    browser_version: '60.0',
    os: 'Windows',
    os_version: '10',
    resolution : '1366x768'
  },
  safari: {
    base: 'BrowserStack',
    browser: 'safari',
    browser_version: '11.1',
    os: 'OS X',
    os_version: 'High Sierra',
    resolution : '1366x768'
  },
  ie11: {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '11.0',
    os: 'Windows',
    os_version: '10',
    resolution : '1366x768'
  },
  edge: {
    base: 'BrowserStack',
    browser: 'edge',
    browser_version: '17.0',
    os: 'Windows',
    os_version: '10',
    resolution : '1366x768'
  }
}
