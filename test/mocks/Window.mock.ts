const MutationObserverMock = { observe: jest.fn() };

export class WindowMock {
  private readonly callbackQ = {};
  private offsetHeight: number;
  private innerHeight: number;
  private bodyHeight: number;

  constructor() {
    if (typeof jest.spyOn === "function") {
      for (const key in this.constructor.prototype) {
        if (this.constructor.prototype.hasOwnProperty(key)) {
          jest.spyOn(this, key as keyof WindowMock);
        }
      }
    }
  }

  public Events = {
    STYLE_PARAMS_CHANGE: "style_params_change"
  };

  public given = {
    offsetHeight: (offsetHeight: number): WindowMock => {
      this.offsetHeight = offsetHeight;
      this.innerHeight = offsetHeight - 10;
      return this;
    },
    bodyHeight: (bodyHeight: number): WindowMock => {
      this.bodyHeight = bodyHeight;
      return this;
    }
  };

  public when = {
    triggerResize: () => {
      (this.callbackQ["resize"] || []).forEach(cb => cb());
    },
    triggerTransitionEnd: () => {
      (this.callbackQ["transitionend"] || []).forEach(cb => cb());
    }
  };

  public addEventListener(eventName, cb) {
    this.callbackQ[eventName] = this.callbackQ[eventName] || [];
    this.callbackQ[eventName].push(cb);
  }

  public MutationObserver = jest
    .fn()
    .mockImplementation(() => MutationObserverMock);
  public document = (_this => ({
    documentElement: {
      get offsetHeight() {
        return _this.offsetHeight;
      }
    },
    body: {
      get offsetHeight() {
        return _this.bodyHeight;
      }
    }
  }))(this);
}
