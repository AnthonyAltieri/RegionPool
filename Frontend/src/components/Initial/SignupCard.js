/**
 * @author Anthony Altieri on 10/26/16.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { signUp } from '../../api/User';
import * as UserActions from '../../actions/User'


const validEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const hasValidCredentials = (
  email = '',
  password = '',
  firstName = '',
  lastName = ''
) => {
  console.log('email', email);
  console.log('password', password);
  console.log('firstName', firstName);
  console.log('lastName', lastName);
  if (!validEmail(email)) {
    toastr.error('Credential Error', 'Enter a valid email.');
    return false;
  }

  if (!password.trim()) {
    toastr.error('Credential Error', 'Enter a valid password.');
    return false;
  }

  if (!firstName.trim()) {
    toastr.error('Credential Error', 'Enter a valid first name');
  }

  if (!lastName.trim()) {
    toastr.error('Credential Error', 'Enter a valid last name');
  }

  return true;
};

let LoginCard = ({
  goToLogin,
  goToDashMain,
  signedUp,
}) => {
  let email;
  let password;
  let firstName;
  let lastName;
  return (
    <div
      className="login-card"
      style={{
        position: "relative",
        justifyContent: "flex-start !important"
      }}
    >
      <IconButton
        style={{
          position: "absolute",
          top: "4px",
          left: "4px",
        }}
        onClick={() => {
          goToLogin();
        }}
      >
        <FontIcon
          className="material-icons"
        >
          arrow_back
        </FontIcon>
      </IconButton>
      <div
        className="c"
        style={{
          paddingTop: "62px",
        }}
      >
        <TextField
          floatingLabelText="Email"
          onChange={(event) => {
            email = event.target.value;
          }}
        />
        <TextField
          floatingLabelText="First name"
          type="text"
          onChange={(event) => {
            firstName = event.target.value;
          }}
        />
        <TextField
          floatingLabelText="Last Name"
          type="text"
          onChange={(event) => {
            lastName = event.target.value;
          }}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          onChange={(event) => {
            password = event.target.value;
          }}
        />
        <br />
        <br />
        <RaisedButton
          label={'Submit'}
          onClick={() => {
            if (hasValidCredentials(email, password, firstName, lastName)) {
              signUp(email.toLowerCase(), password, firstName, lastName)
                .then((payload) => {
                  const { error, inUse, id, firstName, lastName } = payload;
                  if (!!error) {
                    toastr.error('Something went wrong please try again')
                    return;
                  }
                  if (!!inUse) {
                    toastr.info('That email is already in use');
                    return;
                  }
                  signedUp(id, firstName, lastName);
                  toastr.success('Signed up successfully');
                  goToDashMain();
                })
                .catch((error) => {
                  console.log('ERROR: ', error);
                  toastr.error('Something went wrong please try again')
                })
            }
          }}
          fullWidth
          secondary
        />
      </div>
    </div>
  );
};

const stateToProps = (state) => ({
});
const dispatchToProps = (dispatch) => ({
  goToLogin: () => {
    dispatch(push('/login'));
  },
  signedUp: (id, firstName, lastName) => {
    dispatch(UserActions.signedUp(id, firstName, lastName));
  },
  goToDashMain: () => {
    dispatch(push('/dash/main'));
  }
});

LoginCard = connect(
  stateToProps,
  dispatchToProps
)(LoginCard);

export default LoginCard;
