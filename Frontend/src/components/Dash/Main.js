/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class Main extends Component {
  render() {
    const { goToDashDestination } = this.props;

    return (
      <div className="main fullscreen">
        <div className="container-map">
          <img src={require('../../../img/map.png')} />
        </div>
        <FloatingActionButton
          style={{
            position: "absolute",
            bottom: "64px",
            right: "12px",
          }}
          onClick={() => {
            goToDashDestination();
          }}
        >
          <FontIcon className="material-icons">directions_bus</FontIcon>
        </FloatingActionButton>
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
  goToDashDestination: () => {
    dispatch(push('/dash/destination'));
  }
});

Main = connect(
  stateToProps,
  dispatchToProps
)(Main);

export default Main;
