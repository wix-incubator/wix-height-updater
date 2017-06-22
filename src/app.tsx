import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import App from './components/App';
import {listenToHeightChanges} from './';


ReactDOM.render(
    <App/>,
  document.getElementById('root')
);

//window.Wix.setHeight(100);
listenToHeightChanges(window.Wix);