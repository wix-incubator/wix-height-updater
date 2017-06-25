import {$, browser} from 'protractor';
import {describe, it} from 'selenium-webdriver/testing';

async function add100pxBlock() {
    browser.executeScript(() => {
        window.frames[0].frameElement.contentWindow.add100pxBlock()
    });
}

async function changeDivsBorderTo100px() {
    browser.executeScript(() => {
        window.frames[0].frameElement.contentWindow.changeDivsBorderTo100px();
    });
}

async function getIframeWindowHeight() {
    browser.switchTo().frame('app-iframe');
    const appSize = await $('html').getSize();
    browser.switchTo().defaultContent();

    return appSize.height + 'px';
}


async function getIframeContainerHeight() {
    return await ($('[data-hook="iframe-container"]').getCssValue('height'));
}

async function getInnerFrameSize() {
    return browser.executeScript(() => {
        return window.frames[0].frameElement.contentWindow.document.documentElement.offsetHeight + 'px'
    });
}

describe('React application', () => {
    describe('open page', () => {
        it('should update iframe height to initial height', async () => {
            await browser.get('/iframeContainer');
            await browser.sleep(1000);
            expect(await getIframeContainerHeight()).toBe(await getInnerFrameSize());
            add100pxBlock();
            await browser.sleep(1000);
            expect(await getIframeContainerHeight()).toBe(await getInnerFrameSize());
            changeDivsBorderTo100px();
            await browser.sleep(1000);
            expect(await getIframeContainerHeight()).toBe(await getInnerFrameSize());
        });
    });
});
