import * as debounce from 'lodash.debounce';

export interface IOptions {
  resizeOnly: boolean;
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

export function listenToHeightChanges(wixSdk, window, options: Partial<IOptions> = {}) {
  let lastHeight = window.document.documentElement.offsetHeight;

  const updateHeight = () => {
    !paused && wixSdk.setHeight(window.document.documentElement.offsetHeight);
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

  window.addEventListener('resize', updateHeightWithDebounce);

  if (!options.resizeOnly) {
    window.addEventListener('transitionend', updateHeightIfChanged);

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
