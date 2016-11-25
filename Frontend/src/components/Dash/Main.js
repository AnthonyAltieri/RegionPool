/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import LocationLoader from '../Maps/LocationLoader';
import * as LoadingActions from '../../actions/Loading';
import * as UserActions from '../../actions/User';
import { lightBlue500 } from '../../../node_modules/material-ui/styles/colors';
import MainMap from '../Maps/MainMap';

class Main extends Component {
  componentDidMount() {
    const {
      retrievedCurrentLocation,
      userId,
      goToLogin,
      startLoading,
      stopLoading,
    } = this.props;
    if (typeof userId === 'undefined') {
      toastr.info('You must log in to use our service');
      goToLogin();
    }
    console.log('navigator.geolocation', navigator.geolocation);

    if (!!navigator.geolocation) {
      console.log('startLoading()')
      startLoading();
    } else {
      // TODO: Fix the temporary solution
      toastr.error('You do not have a browser that support location,' +
        'you must use a browser that does to use this application.');

    }
    const googleMapsApiInterval = setInterval(() => {
      if (!typeof google === 'undefined') {
        stopLoading();
        clearInterval(googleMapsApiInterval)
      }
    }, 1000)

  }

  render() {
    const { goToDashDestination, curLat, curLong,
      setCurrentLocationInterval,
      currentLocationInterval,
      isInPickupZone,
      setLocationStatus,
      setCurrentZone,
      isLoadingCurrentPosition,
      stopLoading
    } = this.props;
    return (
      <div className="main fullscreen">
        {!!isLoadingCurrentPosition
          ? <LocationLoader isVisible />
          : <MainMap
            lat={curLat}
            lng={curLong}
            setCurrentLocationInterval={setCurrentLocationInterval}
            currentLocationInterval={currentLocationInterval}
            setLocationStatus={setLocationStatus}
            setCurrentZone={setCurrentZone}
            stopLoading={stopLoading}
            isInPickupZone={isInPickupZone}
          />
        }
        <div
          className="box-info"
          style={{
            backgroundColor: !isLoadingCurrentPosition && !!isInPickupZone
              ? "#66BB6A" : '#dddddd',
          }}
        >
          {!isLoadingCurrentPosition && !!isInPickupZone
            ? <p>Choose destination</p>
            : <p>Go to a pick up region</p>
          }
        </div>
        {!isLoadingCurrentPosition && !!isInPickupZone
          ? <RaisedButton
            style={{
              position: "absolute",
              bottom: "64px",
              right: "52px",
            }}
            label="PICK DESTINATION"
            primary
            onClick={() => {
              ga('send', 'event', 'choosedestination', 'click');
              goToDashDestination();
            }}
          >
          </RaisedButton>
          : null
        }
      </div>
    );
  }
}

const stateToProps = (state) => ({
  curLat: state.User.lat,
  curLong: state.User.long,
  currentLocationInterval: state.User.currentLocationInterval,
  isInPickupZone: state.User.isInPickupZone,
  userId: state.User.id,
  isLoadingCurrentPosition: !!state.Loading,
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
  },
  setCurrentLocationInterval: (interval) => {
    dispatch(UserActions.setCurrentLocationInterval(interval));
  },
  setLocationStatus: (isInPickupZone) => {
    dispatch(UserActions.setLocationStatus(isInPickupZone));
  },
  setCurrentZone: (zone) => {
    dispatch(UserActions.setCurrentZone(zone));
  },
  goToLogin: () => {
    dispatch(push('/login'))
  },
  startLoading: () => {
    dispatch(LoadingActions.startLoading());
  },
  stopLoading: () => {
    dispatch(LoadingActions.stopLoading())
  },
});

Main = connect(
  stateToProps,
  dispatchToProps
)(Main);

export default Main;
