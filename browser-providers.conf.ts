export const customLaunchers = {
  iPhoneXIOS11: {
    base: 'BrowserStack',
    device: 'iPhone X',
    os: 'ios',
    os_version: '11.0'
  },
  iPhoneXIOS10: {
    base: 'BrowserStack',
    device: 'iPhone X',
    os: 'ios',
    os_version: '10.0'
  },
  ChromeHeadlessNoSandbox: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox']
  }
}
