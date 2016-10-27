/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { toastr } from 'react-redux-toastr';

class Boarding extends Component {
  render() {
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
                style={{
                  padding: "22px 0",
                  fontSize: "5em",
                }}
              >
                29s left
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
                }}
              />
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default Boarding;
