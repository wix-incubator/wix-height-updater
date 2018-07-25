import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App/index';
import { listenToHeightChanges } from '../../src/index';

ReactDOM.render(<App />, document.getElementById('root'));

//window.Wix.setHeight(100);
document.addEventListener('DOMContentLoaded', () => {
  listenToHeightChanges(window.Wix, window);
});
