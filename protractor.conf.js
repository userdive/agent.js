exports.config = {
  framework: 'mocha',
  capabilities: {
    browserName: 'chrome'
  },
  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    timeout: 10000
  },
  specs: ['test/*.test.ts'],
  beforeLaunch: () => {
    // https://gist.github.com/arranbartish/defc43ae628af01d13e68c85aef38ce3
    // If you're using type script then you need compiler options
    require('ts-node').register({
      project: 'tsconfig.e2e.json'
    });
  },
  directConnect: true
};
