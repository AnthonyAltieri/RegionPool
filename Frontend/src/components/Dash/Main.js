/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as UserActions from '../../actions/User';
import MainMap from '../Maps/MainMap';

class Main extends Component {
  componentDidMount() {
    const { retrievedCurrentLocation } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        retrievedCurrentLocation(
          position.coords.latitude,
          position.coords.longitude,
        );
      });
      return;
    }
    // TODO: Fix the temporary solution
    toastr.error('You do not have a browser that support location,' +
      'you must use a browser that does to use this application.');

  }

  render() {
    const { goToDashDestination, curLat, curLong,
    } = this.props;

    return (
      <div className="main fullscreen">
        <MainMap
          lat={curLat}
          lng={curLong}
        />
        <div
          className="box-info"
          style={{
            backgroundColor: "#76FF03",
          }}
        >
          <p>You are inside a pick up region</p>
        </div>
        <FloatingActionButton
          style={{
            position: "absolute",
            bottom: "64px",
            right: "42px",
          }}
          onClick={() => {
            goToDashDestination();
          }}
        >
          <FontIcon className="material-icons">directions_bus</FontIcon>
        </FloatingActionButton>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  curLat: state.User.lat,
  curLong: state.User.long,
});

const dispatchToProps = (dispatch) => ({
  goToDashDestination: () => {
    dispatch(push('/dash/destination'));
  },
  closeDrawer: () => {
    dispatch(DrawerActions.closeDrawer());
  },
  retrievedCurrentLocation: (lat, long) => {
    dispatch(UserActions.retrievedCurrentLocation(lat, long));
  }
});

Main = connect(
  stateToProps,
  dispatchToProps
)(Main);

export default Main;
