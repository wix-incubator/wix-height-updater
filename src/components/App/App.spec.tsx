import * as React from 'react';
import {mount} from 'enzyme';
import {I18nextProvider} from 'react-i18next';
import App from './App';

describe('App', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('renders a title correctly', () => {
    wrapper = mount(
        <App/>,
      {attachTo: document.createElement('div')}
    );
    expect(wrapper.find('h2').length).toEqual(1);
  });
});
