# wix-height-updater

Tired of calling `Wix.setHeight` every time your iframe's height was changed?<br>
**wix-height-updater** will do it for you!

### How to use
Install:
```
npm install wix-height-updater
```
Then just import the function and call it like that:
```js
import {listenToHeightChanges} from 'wix-height-updater';

listenToHeightChanges(window.Wix, window);
```
Thats it. Now you can remove all of your calls to `Wix.setHeight`.


If you can't import the function, you can load the bundle (`https://static.parastorage.com/unpkg/wix-height-updater@1.0.140/dist/statics/app.bundle.min.js`) and call `window.HeightUpdater.listenToHeightChanges`

#### Adittional features
You can pause and resume the height updater, useful for cases when you want to control the iframe's height manually temporarily.

Simply import and call `pauseHeightChanges()` and `resumeHeightChanges()`. `isPaused()` is also available.
