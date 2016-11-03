/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { push } from 'react-router-redux';
import { clearDestination } from '../../actions/Destination';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { toastr } from 'react-redux-toastr';
import WaitingMap from '../Maps/WaitingMap';

const cSToCoords = {
  'a st and 1st ave': {
    lat: 32.718841,
    lng: -117.163896
  },
  'kettner blvd and w ash st': {
    lat: 32.719866,
    lng: -117.169186,
  },
  'missouri st and ingaham st': {
    lat: 32.803509,
    lng: -117.242041,
  },
  'chalcedony st and lamont st': {
    lat: 32.805668,
    lng: -117.236782,
  },
  'jewell st and law st': {
    lat: 32.805786,
    lng: -117.240718,
  }
};


class Waiting extends Component {

  render() {


    const { goToDashDestination, goToDashInRide } = this.props;

    setTimeout(() => {
      goToDashInRide();

    }, 10000);

    const temporaryDriverName = 'John Smith';
    const isDriverMale = true;
    const stars = 4.2;
    const title = `${temporaryDriverName} is on ${isDriverMale ? 'his' : 'her'} way`;
    const estimatedMin = 8;

    return (
      <div className="waiting fullscreen with-bar">
        <div
          className="c center"
          style={{
            height: "100%",
          }}
        >
          <Card
            style={{
              width: "90%",
              maxWidth: "600px",
              margin: "auto",
              display: "block",
            }}
          >

            <CardHeader
              title={title}
              subtitle={`${stars} stars`}
            />
            <CardMedia
              overlay={
                <CardTitle
                  title={`${estimatedMin} ${estimatedMin > 1 ? 'minutes' : 'minute'}`}
                  subtitle="Driver is on their way"
                />
              }
              mediaStyle={{
              }}
            >
              <WaitingMap />
            </CardMedia>
            <CardActions>
              <FlatButton
                label="Call Driver"
                primary
                onClick={() => {
                  toastr.success('Calling Driver.');
                }}
              />
              <FlatButton
                label="Cancel Ride"
                secondary
                onClick={() => {
                  goToDashDestination();
                }}
              />
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  crossStreet: state.Destination.crossStreet,
  coords: cSToCoords[state.Destination.crossStreet.toLowerCase()],
});
const dispatchToProps = (dispatch) => ({
  goToDashDestination: () => {
    dispatch(clearDestination());
    dispatch(push('/dash/destination'));
  },
  goToDashInRide: () => {
    dispatch(push('/dash/inRide'));
  }
});

Waiting = connect(
  stateToProps,
  dispatchToProps
)(Waiting);


export default Waiting;
