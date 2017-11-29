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

describe('React application', () => {
    describe('open page', () => {
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
    });
});
