import {$, browser} from 'protractor';
import {describe, it} from 'selenium-webdriver/testing';

function add100pxBlock() {
    browser.executeScript(() => {
        window.frames[0].frameElement.contentWindow.add100pxBlock();
    });
}

function add100pxBlockWithTransition() {
    browser.executeScript(() => {
        window.frames[0].frameElement.contentWindow.add100pxBlockWithTransition();
    });
}

function changeDivsBorderTo100px() {
    browser.executeScript(() => {
        window.frames[0].frameElement.contentWindow.changeDivsBorderTo100px();
    });
}

async function getIframeContainerHeight() {
    return await ($('[data-hook="iframe-container"]').getCssValue('height'));
}

async function getInnerFrameSize() {
    return browser.executeScript(() => {
        return window.frames[0].frameElement.contentWindow.document.documentElement.offsetHeight + 'px';
    });
}

async function setIframeHeight(newHeight) {
    return browser.executeScript((newHeight) => {
        return window.Wix.setHeight(newHeight);
    }, newHeight);
}

describe('Wix Height Updater', () => {
    it('should update iframe height to initial height', async () => {
        await browser.get('/iframeContainer');
        await browser.sleep(1000);
        expect(await getIframeContainerHeight()).toBe(await getInnerFrameSize());
        let lastIframeHeight = await getIframeContainerHeight();
        add100pxBlock();
        await browser.sleep(1000);
        expect(await getIframeContainerHeight()).toBe(await getInnerFrameSize());
        expect(await getIframeContainerHeight()).not.toBe(lastIframeHeight);
        lastIframeHeight = await getIframeContainerHeight();
        changeDivsBorderTo100px();
        await browser.sleep(1000);
        expect(await getIframeContainerHeight()).toBe(await getInnerFrameSize());
        expect(await getIframeContainerHeight()).not.toBe(lastIframeHeight);
        lastIframeHeight = await getIframeContainerHeight();
        add100pxBlockWithTransition();
        await browser.sleep(1500);
        expect(await getIframeContainerHeight()).toBe(await getInnerFrameSize());
        expect(await getIframeContainerHeight()).not.toBe(lastIframeHeight);
    });

    it('should resize iframe to content height when changing iframe height to be higher than content', async () => {
        await browser.get('/iframeContainer');
        await browser.sleep(1000);
        const initialHeight = await getIframeContainerHeight();
        expect(initialHeight).toBe(await getInnerFrameSize());
        await setIframeHeight(100000);
        await browser.sleep(1000);
        expect(initialHeight).toBe(await getIframeContainerHeight());
    });
});
