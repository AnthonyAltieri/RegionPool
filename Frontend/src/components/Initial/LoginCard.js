/**
 * @author Anthony Altieri on 10/26/16.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';


const validEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const hasValidCredentials = (email = '', password = '', endLoading) => {
  if (!validEmail(email)) {
    toastr.error('Credential Error', 'Enter a valid email.');
    return false;
  }

  if (!password.trim()) {
    toastr.error('Credential Error', 'Enter a valid password.');
    return false;
  }

  return true;
};

let LoginCard = ({
  goToSignup,
  tryLogin,
}) => {
  let email;
  let password;
  return (
    <div
      className="login-card"
      style={{
        justifyContent: "space-between",
      }}
    >
      <div className="c">
        <div
          className="c center"
        >
          <img
            src={require('../../../img/car.svg')}
            className="logo"
          />
          <h1 className="logo-text">RegionPool</h1>
        </div>
        <TextField
          floatingLabelText="Email"
          value={email}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          value={password}
        />
        <br />
        <br />
        <RaisedButton
          label={'Log in'}
          onClick={() => {
            tryLogin(
              email,
              password
            );
          }}
          fullWidth
          secondary
        />
        <br />
        <RaisedButton
          label={'Sign up'}
          onClick={() => {
            goToSignup();
          }}
          fullWidth
          secondary
        />
      </div>
      <FlatButton
        label="Forgot password"
        primary
      />
    </div>
  );
};

const stateToProps = (state) => ({
});
const dispatchToProps = (dispatch) => ({
  goToSignup: () => {
    dispatch(push('/signup'));
  },
  tryLogin: (email, password) => {
    // if (hasValidCredentials(email, password)) {
    // }
    dispatch(push('/dash/main'));
  }
});

LoginCard = connect(
  stateToProps,
  dispatchToProps
)(LoginCard);

export default LoginCard;