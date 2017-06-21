import 'babel-polyfill';

describe('React application', () => {
  describe('open page', () => {
    it('should update iframe height to initial height', async () => {
      await browser.get('/iframeContainer');
      //await browser.sleep(200);
      const iframeSize = await $('[data-hook="iframe-container"]').getSize();
      expect(iframeSize.height).toBe(100);
    });
  });
});
