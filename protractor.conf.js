import {start} from './test/mock/fake-server';

export const config = {
  baseUrl: 'http://localhost:3100/',
  specs: ['test/**/*.e2e.js'],
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare() {
    browser.ignoreSynchronization = true;
    start(3100);
  }
};
