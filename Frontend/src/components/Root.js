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
import Destination from './Dash/Destination';
import Waiting from './Dash/Waiting';
import Boarding from './Dash/Boarding';
import Finish from './Dash/Finish';
import InRide from './Dash/InRide';

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
              <Route path="destination" component={Destination} />
              <Route path="waiting" component={Waiting} />
              <Route path="boarding" component={Boarding} />
              <Route path="finish" component={Finish} />
              <Route path="inRide" component={InRide} />
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
};


export default Root;
