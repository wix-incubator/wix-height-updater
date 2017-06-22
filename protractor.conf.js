const fakeServer = require('./test/mock/fake-server');

module.exports = {
  config: {
    baseUrl: 'http://localhost:3100/',
    specs: ['test/**/*.e2e.ts'],
    SELENIUM_PROMISE_MANAGER: false,
    onPrepare() {
      browser.ignoreSynchronization = true;
      fakeServer.start(3100);
    }
  }
};
