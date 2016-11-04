/**
 * @author Anthony Altieri on 11/2/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const text = {
  textAlign: "center" ,
  color: "#333333",
};

const row = {
  display: "flex",
  flexFlow: "row",
  justifyContent: "center",
};

let InRide = ({
  city,
  crossStreet,
  goToDashFinish,
}) => {
  const FIVE_SECONDS = 5000;
  setTimeout(() => {
    goToDashFinish()
  }, FIVE_SECONDS);
  return (
    <div className="fullscreen with-bar">
      <h1 style={text}>You are riding with </h1>
      <h3 style={text}>John Smith </h3>
      <hr />
      <h1 style={text}>You are going to</h1>
      <div style={row}>
        <h3
          style={{
            ...text,
            marginRight: "12px",
          }}
        >City:</h3>
        <h3 style={text}>{city}</h3>
      </div>
      <div style={row}>
        <h3
          style={{
            ...text,
            marginRight: "12px",
          }}
        >Cross Street:</h3>
        <h3 style={text}>{crossStreet}</h3>
      </div>
    </div>
  );
};

const stateToProps = (state) => ({
  city: state.Destination.city,
  crossStreet: state.Destination.crossStreet,
});

const dispatchToProps = (dispatch) => ({
  goToDashFinish: () => {
    dispatch(push('/dash/finish'));
  },
});

InRide = connect(
  stateToProps,
  dispatchToProps,
)(InRide);

export default InRide;
