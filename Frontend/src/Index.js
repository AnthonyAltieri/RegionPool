/**
 * @author Anthony Altieri on 10/23/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';
require('./scss/style.scss');



const store = configureStore();

module.hot.accept();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);