import {WixMock} from '../test/mocks/Wix.mock';
import {WindowMock} from '../test/mocks/Window.mock';
import {listenToHeightChanges} from './index';

describe('listenToHeightChange', () => {
  let wixMock: WixMock,
    windowMock: WindowMock,
    offsetHeight;

  beforeEach(() => {
    wixMock = new WixMock();
    windowMock = new WindowMock();
    windowMock.given.offsetHeight(offsetHeight = 100);
  });

  describe('default', () => {
    beforeEach(() => {
      listenToHeightChanges(wixMock, windowMock);
    });

    it('should register events on styleParamChange + window.resize + domChange + transitionEnd', () => {
      expect(windowMock.addEventListener).toHaveBeenCalledTimes(2);
      expect(windowMock.addEventListener).toHaveBeenNthCalledWith(1, 'resize', expect.any(Function));
      expect(windowMock.addEventListener).toHaveBeenNthCalledWith(2, 'transitionend', expect.any(Function));
      expect(wixMock.addEventListener).toHaveBeenCalledWith(wixMock.Events.STYLE_PARAMS_CHANGE, expect.any(Function));
    });

    it('should set height when window resize', () => {
      windowMock.when.triggerResize();
      expect(wixMock.setHeight).toHaveBeenCalledWith(offsetHeight);
    });
  });

  describe('with options', () => {
    beforeEach(() => {
      listenToHeightChanges(wixMock, windowMock, {resizeOnly: true});
    });

    it('should listen only on resize event', () => {
      expect(windowMock.addEventListener).toHaveBeenCalledTimes(1);
      expect(windowMock.addEventListener).toHaveBeenNthCalledWith(1, 'resize', expect.any(Function));
      expect(wixMock.addEventListener).not.toHaveBeenCalled();
    });
  });

    it('should expose window.listenToHeightChanges', () => {
        expect(window.listenToHeightChanges).toBeInstanceOf(Function);
        expect(window.listenToHeightChanges.toString()).toEqual(listenToHeightChanges.toString());
    });
});
