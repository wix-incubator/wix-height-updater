import 'babel-polyfill';
import axios from 'axios';
import {wixAxiosConfig} from 'wix-axios-config';
import {getTestBaseUrl} from './test-common';

wixAxiosConfig(axios, {baseURL: getTestBaseUrl()});
