import { WixMock } from "../test/mocks/Wix.mock";
import { WindowMock } from "../test/mocks/Window.mock";
import {
  isPaused,
  listenToHeightChanges,
  pauseHeightChanges,
  resumeHeightChanges
} from "./index";

describe("listenToHeightChange", () => {
  let wixMock: WixMock, windowMock: WindowMock, offsetHeight;

  beforeEach(() => {
    wixMock = new WixMock();
    windowMock = new WindowMock();
    windowMock.given.offsetHeight((offsetHeight = 100));
  });

  describe("default", () => {
    beforeEach(() => {
      listenToHeightChanges(wixMock, windowMock);
    });

    it("should register events on styleParamChange + window.resize + domChange + transitionEnd", () => {
      expect(windowMock.addEventListener).toHaveBeenCalledTimes(2);
      expect(windowMock.addEventListener).toHaveBeenNthCalledWith(
        1,
        "resize",
        expect.any(Function)
      );
      expect(windowMock.addEventListener).toHaveBeenNthCalledWith(
        2,
        "transitionend",
        expect.any(Function)
      );
      expect(wixMock.addEventListener).toHaveBeenCalledWith(
        wixMock.Events.STYLE_PARAMS_CHANGE,
        expect.any(Function)
      );
    });

    it("should set height when window resize", () => {
      windowMock.when.triggerResize();
      expect(wixMock.setHeight).toHaveBeenCalledWith(offsetHeight);
    });

    it("should pause and resume setting height when pause and resume functions are called", () => {
      (wixMock as jest.Mocked<WixMock>).setHeight.mockReset();
      pauseHeightChanges();
      windowMock.when.triggerResize();
      expect(wixMock.setHeight).not.toHaveBeenCalled();
      expect(isPaused()).toEqual(true);
      resumeHeightChanges();
      windowMock.when.triggerResize();
      expect(wixMock.setHeight).toHaveBeenCalled();
      expect(isPaused()).toEqual(false);
    });
  });

  describe("with options", () => {
    it("should listen only on resize event", () => {
      listenToHeightChanges(wixMock, windowMock, { resizeOnly: true });

      expect(windowMock.addEventListener).toHaveBeenCalledTimes(1);
      expect(windowMock.addEventListener).toHaveBeenNthCalledWith(
        1,
        "resize",
        expect.any(Function)
      );
      expect(wixMock.addEventListener).not.toHaveBeenCalled();
      expect(wixMock.setHeight).not.toHaveBeenCalled();
    });

    it("should clamp to min height", () => {
      listenToHeightChanges(wixMock, windowMock, { minHeight: 300 });

      expect(wixMock.setHeight).toHaveBeenCalledWith(300);
    });

    it("should clamp to max height", () => {
      windowMock.given.offsetHeight((offsetHeight = 1000));
      listenToHeightChanges(wixMock, windowMock, { maxHeight: 500 });

      expect(wixMock.setHeight).toHaveBeenCalledWith(500);
    });

    it("should not trigger an update on first render if the body height is 0", () => {
      windowMock.given.bodyHeight(0);
      listenToHeightChanges(wixMock, windowMock);

      expect(wixMock.setHeight).not.toHaveBeenCalled();

      windowMock.when.triggerResize();
      expect(wixMock.setHeight).not.toHaveBeenCalled();

      windowMock.when.triggerResize();
      expect(wixMock.setHeight).not.toHaveBeenCalled();

      windowMock.given.bodyHeight(10);
      windowMock.when.triggerResize();
      expect(wixMock.setHeight).toHaveBeenCalled();
    });
  });
});
