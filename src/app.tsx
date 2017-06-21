import 'babel-polyfill';
import * as React from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import {wixAxiosConfig} from 'wix-axios-config';
import App from './components/App';
import i18n from './i18n';
import {listenToHeightChanges} from './';


ReactDOM.render(
    <App/>,
  document.getElementById('root')
);

window.Wix.setHeight(100);
//listenToHeightChanges(window.Wix);