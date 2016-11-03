/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import { toastr } from 'react-redux-toastr';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import * as DestinationActions from '../../actions/Destination'
import { push } from 'react-router-redux';

const cities = [
  'San Diego', 'Pacific Beach'
];
const crossStreets = {
  'san diego': [
    'A St and 1st Ave',
    'Kettner Blvd and W Ash St'
  ],
  // 'la jolla': [
  //   'Villa La Jolla Dr and Gilman Dr',
  //   'La Jolla Village Dr and Lebon Dr',
  // ],
  'pacific beach': [
    'Missouri St and Ingaham St',
    'Chalcedony St and Lamont St',
    'Jewell St and Law St',
  ],
};


class Destination extends Component {
  componentDidMount() {
    const { activateStep } = this.props;
    activateStep(1);
  }

  render() {
    const { step, activateStep, crossStreetsData,
      enteredCrossStreet, removedCrossStreet, enteredCity,
      goToDashWaiting, savedCity, savedCrossStreet,
    } = this.props;
    console.log('step', step);

    let city;
    let crossStreet;

    const attemptToGoStepTwo = () => {
      const entry = city.state.searchText;
      const match = cities.filter(c => c.toLowerCase() === entry.toLowerCase())[0];
      if (!entry || !match) {
        toastr.error('Must enter a valid city.');
        return;
      }
      enteredCity(match);
      activateStep(2);
    };

    const attemptToGoStepThree = () => {
      const entry = crossStreet.state.searchText;
      const match = crossStreetsData.filter(c => c.toLowerCase() === entry.toLowerCase())[0];
      if (!entry || !match) {
        toastr.error('Must enter a valid cross street.');
        return;
      }
      enteredCrossStreet(match);
      activateStep(3);
    };

    return (
      <div className="destination fullscreen with-bar">
        <Stepper
          linear
          orientation="vertical"
        >
          <Step
            active={step === 1}
          >
            <StepButton onTouchTap={() => { activateStep(1) }}>
              Enter a city
            </StepButton>
            <StepContent>
              <div
                className="r center"
              >
                <AutoComplete
                  hintText="Enter a city..."
                  className="input"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                  }}
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={cities}
                  ref={(n) => {
                    city = n;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      attemptToGoStepTwo();
                    }
                  }}
                />
              </div>
              <div
                className="r right"
                style={{
                  marginTop: "12px",
                }}
              >
                <RaisedButton
                  label="Next"
                  primary
                  onClick={() => {
                    attemptToGoStepTwo();
                  }}
                />
              </div>
            </StepContent>
          </Step>
          <Step
            active={step === 2}
          >
            <StepButton>
              Enter a cross street
            </StepButton>
            <StepContent>
              <div
                className="r center"
              >
                <AutoComplete
                  hintText="Enter a cross street..."
                  className="input"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                  }}
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={crossStreetsData}
                  ref={(n) => {
                    crossStreet = n;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      attemptToGoStepThree();
                    }
                  }}
                />
              </div>
              <div
                className="r right"
              >
                <RaisedButton
                  label="Back"
                  secondary
                  onClick={() => {
                    crossStreet = '';
                    removedCrossStreet();
                    activateStep(1);
                  }}
                  style={{
                    marginRight: "12px",
                  }}
                />
                <RaisedButton
                  label="Next"
                  primary
                  onClick={() => {
                    attemptToGoStepThree();
                  }}
                />
              </div>
            </StepContent>
          </Step>
          <Step
            active={step === 3}
          >
            <StepButton>
              Confirmation
            </StepButton>
            <StepContent>
              <p>Is this information correct?</p>
              <br />
              <p style={{ display: "inline-block" }}>city:</p>
              <p
                style={{
                  display: "inline-block" ,
                  marginLeft: "8px",
                  fontWeight: "700",
                }}
              >
                {savedCity}
              </p>
              <br />
              <p style={{ display: "inline-block" }}>cross street:</p>
              <p
                style={{
                  display: "inline-block" ,
                  marginLeft: "8px",
                  fontWeight: "700",
                }}
              >
                {savedCrossStreet}
              </p>
              <div className="r right">
                <RaisedButton
                  label="Back"
                  secondary
                  onClick={() => { activateStep(2) }}
                  style={{
                    marginRight: "12px",
                  }}
                />
                <RaisedButton
                  label="Confirm"
                  primary
                  onClick={() => {  goToDashWaiting() }}
                />
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  step: state.Destination.step,
  crossStreetsData: !!state.Destination.city
    ? crossStreets[state.Destination.city.toLowerCase()] || []
    : []
  ,
  savedCity: state.Destination.city,
  savedCrossStreet: state.Destination.crossStreet,
});

const dispatchToProps = (dispatch) => ({
  activateStep: (number) => {
    dispatch(DestinationActions.goStep(number))
  },
  enteredCity: (city) => {
    dispatch(DestinationActions.enteredCity(city))
  },
  enteredCrossStreet: (crossStreet) => {
    dispatch(DestinationActions.enteredCrossStreet(crossStreet));
  },
  removedCrossStreet: () => {
    dispatch(DestinationActions.removedCrossStreet());
  },
  goToDashWaiting: () => {
    dispatch(push('/dash/waiting'));
  }
});

Destination = connect(
  stateToProps,
  dispatchToProps,
)(Destination);

export default Destination;
