import 'jsdom-global/register';
import * as React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import i18next from 'i18next';
import {I18nextProvider} from 'react-i18next';
import App from './App';
import {afterEach, describe, it} from 'selenium-webdriver/testing';

describe('App', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('renders a title correctly', () => {
    wrapper = mount(
        <App/>,
      {attachTo: document.createElement('div')}
    );
    expect(wrapper.find('h2').length).to.eq(1);
  });
});
