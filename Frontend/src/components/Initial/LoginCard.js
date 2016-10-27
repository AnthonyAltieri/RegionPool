/**
 * @author Anthony Altieri on 10/26/16.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import * as LoginActions from '../../actions/Login'


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
  isDialogOpen,
  showDialog,
  hideDialog,
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
      <Dialog
        title="Password recovery"
        open={isDialogOpen}
        actions={[
          <FlatButton
            label="Cancel"
            secondary
            onClick={() => {
              hideDialog();
            }}
          />,
          <FlatButton
            label="Submit"
            primary
            keyboardFocused
            onClick={() => {
              toastr.success('Password recovery email sent.')
              hideDialog();
            }}
          />
        ]}
      >
        <div className="c center">
          <p>
            Enter an email to recover your password.
          </p>
          <TextField
            floatingLabelText="Email"
          />
        </div>
      </Dialog>
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
        onClick={() => {
          showDialog();
        }}
      />
    </div>
  );
};

const stateToProps = (state) => ({
  isDialogOpen: !!state.Login.isDialogeOpen,
});
const dispatchToProps = (dispatch) => ({
  goToSignup: () => {
    dispatch(push('/signup'));
  },
  tryLogin: (email, password) => {
    // if (hasValidCredentials(email, password)) {
    // }
    dispatch(push('/dash/main'));
  },
  showDialog: () => {
    dispatch(LoginActions.showDialog());
  },
  hideDialog: () => {
    dispatch(LoginActions.hideDialog());
  }
});

LoginCard = connect(
  stateToProps,
  dispatchToProps
)(LoginCard);

export default LoginCard;