/**
 * @author Anthony Altieri on 10/23/16.
 */

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import AppWithToast from './AppWithToast';
import Initial from './Initial/Initial';
import Dash from './Dash/Dash';
import Main from './Dash/Main';

class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router history={syncHistoryWithStore(browserHistory, store)}>
          <Route path="/" component={AppWithToast}>
            <IndexRedirect to="/login" />
            <Route path="login" component={Initial} />
            <Route path="signup" component={Initial} />
            <Route path="dash" component={Dash}>
              <IndexRedirect to="/dash/main" />
              <Route path="main" component={Main} />
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
};


export default Root;