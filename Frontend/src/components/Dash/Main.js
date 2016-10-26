/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return (
      <div className="main fullscreen">
        <div className="container-map">
          <img src={require('../../../img/map.png')} />
        </div>
        <div className="box-info">
          <p>0.2 miles from nearest pick-up region</p>

        </div>

      </div>
    );
  }
}

const stateToProps = (state) => ({
});

const dispatchToProps = (dispatch) => ({
});

Main = connect(
  stateToProps,
  dispatchToProps
)(Main);

export default Main;
