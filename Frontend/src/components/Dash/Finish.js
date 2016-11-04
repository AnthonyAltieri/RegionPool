/**
 * @author Anthony Altieri on 10/27/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import { yellow500 } from 'material-ui/styles/colors';
import * as FinishActions from '../../actions/Finish'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { push } from 'react-router-redux';

const Star = ({
  onStarCheck,
  checked,
}) => (
  <Checkbox
    checked={checked}
    onCheck={onStarCheck}
    uncheckedIcon={
      <FontIcon
        className="material-icons"
      >
        star_border
      </FontIcon>
    }
    checkedIcon={
      <FontIcon
        className="material-icons"
        color={yellow500}
      >
        star_rate
      </FontIcon>
    }
    style={{
      width: "auto",
    }}
  />
);

class Finish extends Component {
  render() {
    const { setStars, stars, crossStreet, goToDashMain } = this.props;

    const crossStreets = 'Nobel Dr and Villa La Jolla Dr';
    const driver = 'John Smith';

    return (
      <div className="finish">
        <h3>You have arrived at</h3>
        <h1>{crossStreet}</h1>
        <Divider />
        <h3>Your trip took</h3>
        <h1>20 minutes</h1>
        <Divider />
        <h3>Rate your driver</h3>
        <h2>{driver}</h2>
        <div className="r center">
          <Star
            onStarCheck={(e, isChecked) => {
              console.log('onStarCheck')
              if (isChecked) {
                setStars(1);
                return;
              }
              setStars(0);
            }}
            checked={stars >= 1}
          />
          <Star
            onStarCheck={(e, isChecked) => {
              console.log('onStarCheck')
              if (isChecked) {
                setStars(2);
                return;
              }
              setStars(1);
            }}
            checked={stars >= 2}
          />
          <Star
            onStarCheck={(e, isChecked) => {
              console.log('onStarCheck')
              if (isChecked) {
                setStars(3);
                return;
              }
              setStars(2);
            }}
            checked={stars >= 3}
          />
          <Star
            onStarCheck={(e, isChecked) => {
              console.log('onStarCheck')
              if (isChecked) {
                setStars(4);
                return;
              }
              setStars(3);
            }}
            checked={stars >= 4}
          />
          <Star
            onStarCheck={(e, isChecked) => {
              console.log('onStarCheck')
              if (isChecked) {
                setStars(5);
                return;
              }
              setStars(4);
            }}
            checked={stars >= 5}
          />
        </div>
        <h3
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          {stars} stars
        </h3>
        <div
          className="r"
          style={{
            justifyContent: 'space-between',
          }}
        >
          <RaisedButton
            label="Skip"
            secondary
            onClick={() => {
              goToDashMain();
            }}
          />
          <RaisedButton
            label="Submit"
            primary
            onClick={() => {
              goToDashMain();
            }}
          />
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  stars: state.Finish.stars || 0,
  crossStreet: state.Destination.crossStreet,
});
const dispatchToProps = (dispatch) => ({
  setStars: (stars) => {
    dispatch(FinishActions.setStars(stars));
  },
  goToDashMain: () => {
    dispatch(push('/dash/main'));
  }
});

Finish = connect(
  stateToProps,
  dispatchToProps
)(Finish);




export default Finish;
