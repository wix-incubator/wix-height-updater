export class WixMock {
  private readonly callbackQ = {};

  constructor() {
    if (typeof (jest.spyOn) === 'function') {
      for (const key in this.constructor.prototype) {
        if (this.constructor.prototype.hasOwnProperty(key)) {
          jest.spyOn(this, key as keyof WixMock);
        }
      }
    }
  }

  public Events = {
    STYLE_PARAMS_CHANGE: 'style_params_change'
  };

  public given = {

  };

  public when = {
    updateStyleParams: () => {
      const cb = this.callbackQ[this.Events.STYLE_PARAMS_CHANGE].shift();
      if (cb) {
        return cb();
      }
    }
  };

  public addEventListener(eventName, cb) {
    this.callbackQ[eventName] = this.callbackQ[eventName] || [];
    this.callbackQ[eventName].push(cb);
  }

  public setHeight() {
    //
  }
}
