import * as _ from 'lodash';

export function listenToHeightChanges(wixSdk, window) {
    let lastHeight = window.document.documentElement.offsetHeight;

    const updateHeight = () => {
        wixSdk.setHeight(window.document.documentElement.offsetHeight);
    }

    const updateHeightIfChanged = () => {
        if (window.innerHeight < lastHeight || window.document.documentElement.offsetHeight !== lastHeight) {
            lastHeight = window.document.documentElement.offsetHeight;
            updateHeight();
        }
    };

    const updateHeightWithDebounce = _.debounce(updateHeightIfChanged, 100, {leading: true});
    const observer = new window.MutationObserver(updateHeightWithDebounce);
    window.addEventListener('resize', updateHeightWithDebounce);

    observer.observe(window.document.body, {attributes: true, childList: true, characterData: true, subtree: true});
    updateHeight();

    window.Wix.addEventListener(wixSdk.Events.STYLE_PARAMS_CHANGE, updateHeight);
}