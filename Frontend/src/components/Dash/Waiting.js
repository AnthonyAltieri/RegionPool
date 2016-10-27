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

class Waiting extends Component {

  render() {

    const { goToDashDestination } = this.props;

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
              <img
                src={require('../../../img/driverInc.png')}
              />
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

const stateToProps = (state) => ({});
const dispatchToProps = (dispatch) => ({
  goToDashDestination: () => {
    dispatch(clearDestination());
    dispatch(push('/dash/destination'));
  }
});

Waiting = connect(
  stateToProps,
  dispatchToProps
)(Waiting);


export default Waiting;
