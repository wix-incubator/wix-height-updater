import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { listenToHeightChanges } from './';

ReactDOM.render(<App />, document.getElementById('root'));

//window.Wix.setHeight(100);
document.addEventListener('DOMContentLoaded', () => {
  listenToHeightChanges(window.Wix, window);
});
