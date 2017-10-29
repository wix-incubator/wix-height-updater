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
