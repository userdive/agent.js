export const customLaunchers = {
  ios11: {
    base: 'TestingBot',
    version: '11.4',
    browserName: 'safari',
    deviceName: 'iPhone X',
    platform: 'iOS'
  },
  ios10: {
    base: 'TestingBot',
    version: '10.3',
    browserName: 'safari',
    deviceName: 'iPhone 6',
    platform: 'iOS'
  },
  android8: {
    base: 'TestingBot',
    deviceName: 'Pixel C',
    os: 'android',
    browserName: 'Chrome',
    version: '8.0',
    platform: 'ANDROID'
  },
  chrome: {
    base: 'TestingBot',
    browserName: 'chrome',
    version: '67.0',
    platform: 'WIN10'
  },
  firefox: {
    base: 'TestingBot',
    browserName: 'firefox',
    version: '60',
    platform: 'WIN10'
  },
  safari: {
    base: 'TestingBot',
    browserName: 'safari',
    version: '11',
    platform: 'HIGH-SIERRA'
  },
  ie11: {
    base: 'TestingBot',
    browserName: 'internet explorer',
    version: '11',
    platform: 'WIN10'
  },
  edge: {
    base: 'TestingBot',
    browserName: 'microsoftedge',
    version: '17.0',
    platform: 'WIN10'
  }
}
