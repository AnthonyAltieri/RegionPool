/**
 * @author Anthony Altieri on 11/10/16.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { resetPassword } from '../../api/User';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';

let ForgotPassword = ({
  params,
  goToLogin,
}) => {
  let password;
  return (
    <div className="fullscreen background-primary
    initial c center">
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
          floatingLabelText="Enter your new password"
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
            if (!password) {
              toastr.info('Enter a valid password');
              return;
            }
            resetPassword(params.code, password)
              .then((payload) => {
                const { error } = payload;
                if (!!error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                toastr.success('Password successfully reset');
                goToLogin();
              })
              {/*.catch((error) => { toastr.error('Something went wrong please try again') })*/}
          }}
          fullWidth
          secondary
        />
      </div>
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

ForgotPassword = connect(
  stateToProps,
  dispatchToProps
)(ForgotPassword);

export default ForgotPassword;
