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
  goToLogin,
}) => {
  let email;
  let password;
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
          label={'Submit'}
          onClick={() => {
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
});

LoginCard = connect(
  stateToProps,
  dispatchToProps
)(LoginCard);

export default LoginCard;
