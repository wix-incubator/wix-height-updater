import {$, browser} from 'protractor';

async function add100pxBlock() {
  browser.executeScript(() => {
    window.add100pxBlock();
  });
}

describe('React application', () => {
  describe('open page', () => {
    it('should update iframe height to initial height', async () => {
      await browser.get('/iframeContainer');
      //await browser.sleep(200);
      const iframeSize = await $('[data-hook="iframe-container"]').getSize();
      browser.switchTo().frame('app-iframe');
      const appSize = await $('html').getSize();
      expect(iframeSize.height).toBe(appSize.height);
      add100pxBlock();
      browser.switchTo().defaultContent();
      await browser.sleep(1000);
      const newIframeSize = await $('[data-hook="iframe-container"]').getSize();
      expect(newIframeSize.height).toBe(appSize.height + 100);
    });
  });
});
