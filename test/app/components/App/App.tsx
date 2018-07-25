import * as React from 'react';
import * as s from './App.scss';

function App() {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <h2>title</h2>
      </div>
      <p className={s.intro}>intro</p>
    </div>
  );
}

export default App;
