import * as debounce from 'lodash.debounce';

export function listenToHeightChanges(wixSdk, window) {
  let lastHeight = window.document.documentElement.offsetHeight;

  const updateHeight = () => {
    wixSdk.setHeight(window.document.documentElement.offsetHeight);
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
    leading: true,
  });
  const observer = new window.MutationObserver(updateHeightWithDebounce);
  window.addEventListener('resize', updateHeightWithDebounce);
  window.addEventListener('transitionend', updateHeightIfChanged);

  observer.observe(window.document.body, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
  updateHeight();

  wixSdk.addEventListener(wixSdk.Events.STYLE_PARAMS_CHANGE, updateHeight);
}
