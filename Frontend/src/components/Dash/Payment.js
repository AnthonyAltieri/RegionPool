/**
 * @author Anthony Altieri on 11/10/16.
 */

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { toastr } from 'react-redux-toastr';
import { getCreditCard, saveCreditCard } from '../../api/User';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/User'

const isValidCardNumber = (number) => {
  const regex = /[0-9]+/;
  number = number.replace('-','');
  number = number.replace(',','');
  number = number.replace(' ', '');
  if (number.length !== 16 && !regex.test(number)) {
    toastr.info('Enter a valid card number');
    return false;
  }
  return true;
};

const isValidCsv = (csv) => {
  const regex = /[0-9]+/;
  if (csv.length !== 3 && !regex.test(csv)) {
    toastr.info('Enter a valid csv');
    return false;
  }
  return true;
};

const isValidName = (name) => {
  if (typeof name !== 'string') {
    toastr.info('Enter a valid name');
    return false;
  }
  if (!name) {
    toastr.info('Enter a valid name');
    return false;
  }
  return true;
};

const hasValidCredentials = (number, csv, name) => {
  console.log('number', number);
  console.log('csv', csv);
  console.log('name', name);
  return isValidCardNumber(number) &&
    isValidCsv(csv) &&
    isValidName(name);
};

class Payment extends Component {

  componentDidMount() {
    const { userId, setCreditCard } = this.props;
    getCreditCard(userId)
      .then((creditCard) => {
        console.log('creditCard', creditCard)
        const { number, csv, name } = creditCard;
        if (!number) {
          return;
        }
        setCreditCard(number, csv, name);
      })
      .catch((error) => {
        // do nothing
      })


  }

  render() {
    let name;
    let cardNumber;
    let csv;
    let { creditCard, userId, setCreditCard } = this.props;
    return (
      <div className="fullscreen with-bar background-bright
      initial c center">
        <div
          className="login-card"
          style={{
            position: "relative",
            justifyContent: "flex-start !important"
          }}
        >
          <div
            className="c space-between"
            style={{
              height: "100%",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
              }}
            >
              <TextField
                floatingLabelText="Card Holder Name"
                type="text"
                onChange={(event) => {
                  name = event.target.value;
                }}
              />
              <TextField
                floatingLabelText="Card Number"
                type="text"
                onChange={(event) => {
                  cardNumber = event.target.value;
                }}
              />
              <TextField
                floatingLabelText="CSV"
                type="text"
                onChange={(event) => {
                  csv = event.target.value;
                }}
              />
              {creditCard
                ? <div className="card-info">
                    <p className="header">
                      Current Card
                    </p><br />
                    <p className="label">Card Holder Name:</p>
                    <p style={{ marginLeft: "6px" }} >{creditCard.name}</p>
                    <br />
                    <p className="label">Number:</p>
                    <p style={{ marginLeft: "6px" }} >{creditCard.number}</p>
                    <br />
                    <p className="label">CSV:</p>
                    <p style={{ marginLeft: "6px" }}>{creditCard.csv}</p>
                </div>
                : null
              }


            </div>
            <RaisedButton
              label={'Submit'}
              onClick={() => {
                if (hasValidCredentials(cardNumber, csv, name)) {
                  saveCreditCard(cardNumber, csv, name, userId)
                    .then((payload) => {
                      const { error } = payload;
                      if (!!error) {
                        toastr.error('Something went wrong please try again');
                        return;
                      }
                      setCreditCard(cardNumber, csv, name);
                      toastr.success('Credit card successfully saved');
                    })
                    .catch((error) => {
                      console.log('error', error);
                      toastr.error('Something went wrong please try again');
                    })
                }
              }}
              fullWidth
              secondary
            />
          </div>
        </div>
      </div>
    );

  }
};

const convertToStars = (creditCardNumber) => {
  const blocks = creditCardNumber.split(' ')
  return '**** **** **** ' + blocks[blocks.length - 1];
};

const stateToProps = (state) => ({
  userId: state.User.id,
  creditCard: state.User.creditCard
    ? convertToStars(state.User.creditCard)
    : null,
});

const dispatchToProps = (dispatch) => ({
  setCreditCard: (number, csv, name) => {
    dispatch(UserActions.setCreditCard(number, csv, name));
  }
});

Payment = connect(
  stateToProps,
  dispatchToProps
)(Payment);

export default Payment;
