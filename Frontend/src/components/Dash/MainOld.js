/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as UserActions from '../../actions/User';
import * as LoadingActions from '../../actions/Loading';
import MainMap from '../Maps/MainMapOld';

class Main extends Component {
  componentDidMount() {
    const {
      retrievedCurrentLocation,
      userId,
      goToLogin,
      stopLoading,
      startLoading,
    } = this.props;
    if (typeof userId === 'undefined') {
      toastr.info('You must log in to use our service');
      goToLogin();
    }
    startLoading();

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
      isInPickupZone,
      isLoading,
    } = this.props;

    return (
      <div className="main fullscreen">
        {!!isLoading
          ? <h1>Loading map</h1>
          : <MainMap
            lat={curLat}
            lng={curLong}
            setCurrentLocationInterval={setCurrentLocationInterval}
            currentLocationInterval={currentLocationInterval}
            setLocationStatus={setLocationStatus}
            setCurrentZone={setCurrentZone}
            isInPickupZone={isInPickupZone}
          />
        }

        <div
          className="box-info"
          style={{
            backgroundColor: !!isInPickupZone ? "#76FF03" : '#eeeeee',
          }}
        >
          {!!isInPickupZone
            ? <p>You are inside a pick up region</p>
            : <p>You are outside of a pick up region, get to one to choose destination</p>
          }
        </div>
        {isInPickupZone
          ? <FloatingActionButton
            style={{
              position: "absolute",
              bottom: "64px",
              right: "42px",
            }}
            onClick={() => {
              ga('send', 'event', 'choosedestination', 'click');
              goToDashDestination();
            }}
          >
            <FontIcon className="material-icons">directions_bus</FontIcon>
          </FloatingActionButton>
          : null
        }
      </div>
    );
  }
}

const stateToProps = (state) => ({
  curLat: state.User.lat,
  curLong: state.User.long,
  isLoading: !!state.Loading,
  currentLocationInterval: state.User.currentLocationInterval,
  isInPickupZone: state.User.isInPickupZone,
  userId: state.User.id,
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
    dispatch(LoadingActions.stopLoading());
  }
});

Main = connect(
  stateToProps,
  dispatchToProps
)(Main);

export default Main;
