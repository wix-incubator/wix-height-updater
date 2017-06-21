import React from 'react';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import s from './App.scss';

function App({t}) {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <h2>{t('app.title')}</h2>
      </div>
      <p className={s.intro}>
        {t('app.intro')}
      </p>
    </div>
  );
}

App.propTypes = {
  t: PropTypes.func
};

export default translate(null, {wait: true})(App);
