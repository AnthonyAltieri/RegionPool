/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { toastr } from 'react-redux-toastr';
import { clearDestination } from '../../actions/Destination';
import { push } from 'react-router-redux';
import * as BoardingActions from '../../actions/Boarding';

class Boarding extends Component {
  componentDidMount() {
    const { startTimer, decrementTimer, } = this.props;
    startTimer();

    const ONE_SECOND = 1000;
    this.timerInterval = window.setInterval(() => {
      decrementTimer();
    }, ONE_SECOND);

  }
  render() {
    const { goToDashDestination, timer, goToDashInRide
    } = this.props;

    if (timer === 45) {
      clearInterval(this.timerInterval)
      goToDashInRide();
    }

    return (
      <div className="boarding fullscreen with-bar">
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
              title="Please board the vehicle"
              subtitle="If you fail to board in the allotted time, you will be left behind."
            />
            <div className="c center">
              <h1
                className="timer"
                style={{
                }}
              >
                {timer}s left
              </h1>
            </div>
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
  timer: state.Boarding.timer || 60,
});
const dispatchToProps = (dispatch) => ({
  goToDashDestination: () => {
    dispatch(clearDestination());
    dispatch(push('/dash/destination'));
  },
  startTimer: () => {
    dispatch(BoardingActions.startTimer());
  },
  decrementTimer: () => {
    dispatch(BoardingActions.decrementTimer());
  },
  goToDashInRide: () => {
    dispatch(push('/dash/inRide'));
  }
});

Boarding = connect(
  stateToProps,
  dispatchToProps
)(Boarding);

export default Boarding;
