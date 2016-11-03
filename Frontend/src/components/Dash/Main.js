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
    // TODO: handle no geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position.coords', position.coords)
        retrievedCurrentLocation(
          position.coords.latitude,
          position.coords.longitude,
        );
      });
    }

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
