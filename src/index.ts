import * as debounce from "lodash.debounce";

export interface IOptions {
  resizeOnly: boolean;
  minHeight?: number;
  maxHeight?: number;
}

let paused = false;

export function pauseHeightChanges() {
  paused = true;
}
export function resumeHeightChanges() {
  paused = false;
}

export function isPaused() {
  return paused;
}

export function clamp(value: number, min: number = 0, max: number = Infinity) {
  return Math.min(Math.max(value, min), max);
}

export function listenToHeightChanges(
  wixSdk,
  window,
  options: Partial<IOptions> = {}
) {
  let lastHeight = window.document.documentElement.offsetHeight;
  let firstRender = true;

  const updateHeight = () => {
    const height = clamp(
      window.document.documentElement.offsetHeight,
      options.minHeight,
      options.maxHeight
    );

    const shouldSkipResize =
      window.document.body.offsetHeight === 0 && firstRender;
    if (!shouldSkipResize && !paused) {
      firstRender = false;
      wixSdk.setHeight(height);
    }
  };

  const updateHeightIfChanged = () => {
    if (
      window.innerHeight !== lastHeight ||
      window.document.documentElement.offsetHeight !== lastHeight
    ) {
      lastHeight = window.document.documentElement.offsetHeight;
      updateHeight();
    }
  };

  const updateHeightWithDebounce = debounce(updateHeightIfChanged, 100, {
    leading: true
  });

  window.addEventListener("resize", updateHeightWithDebounce);

  if (!options.resizeOnly) {
    window.addEventListener("transitionend", updateHeightIfChanged);

    const observer = new window.MutationObserver(updateHeightWithDebounce);
    observer.observe(window.document.body, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });

    wixSdk.addEventListener(wixSdk.Events.STYLE_PARAMS_CHANGE, updateHeight);
    updateHeight();
  }
}
