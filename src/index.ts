import * as _ from 'lodash';

export function listenToHeightChanges(wixSdk) {
    let lastHeight = document.documentElement.offsetHeight;

    const updateHeight = () => wixSdk.setHeight(document.documentElement.offsetHeight);

    const updateHeightIfChanged = () => {
        if (window.innerHeight < lastHeight || document.documentElement.offsetHeight !== lastHeight) {
            lastHeight = document.documentElement.offsetHeight;
            updateHeight();
        }
    };

    const updateHeightWithDebounce = _.debounce(updateHeightIfChanged, 100, {leading: true});
    const observer = new MutationObserver(updateHeightWithDebounce);
    window.addEventListener('resize', updateHeightWithDebounce);

    observer.observe(document.body, {attributes: true, childList: true, characterData: true, subtree: true});
    updateHeight();
    //todo: change height on sdk style params change
}