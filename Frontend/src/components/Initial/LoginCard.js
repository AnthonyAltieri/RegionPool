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
import { logIn } from '../../api/User';
import { post } from '../../api/Ajax';
import * as LoginActions from '../../actions/Login'
import * as UserActions from '../../actions/User';
import { forgotPassword } from '../../api/User';


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
  logInSuccess,
  isDialogOpen,
  showDialog,
  hideDialog,
  navigate,
}) => {
  let email;
  let password;
  let recipientEmail;
  return (
    <div
      className="login-card"
      style={{
        justifyContent: "space-between",
      }}
    >
      <Dialog
        title="Password recovery"
        contentStyle={{
          width: "90%"
        }}
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
              if (!validEmail(recipientEmail)) {
                toastr.info('Invalid email');
                return;
              }
              forgotPassword(recipientEmail)
                .then((payload) => {
                  const { invalidRecipient, error, success } = payload;
                  if (invalidRecipient) {
                    toastr.info('No user found with that email');
                    return;
                  }
                  if (error) {
                    toastr.error('Something went wrong please try again');
                  }
                  toastr.success('Recovery email sent');
                  hideDialog();
                })
                .catch((error) => { toastr.error('Something went wrong please try again') })
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
            onChange={(event) => {
              recipientEmail = event.target.value;
            }}
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
          onChange={(event) => {
            email = event.target.value;
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
          label={'Log in'}
          onClick={() => {
            console.log('on click')
            if (hasValidCredentials(email, password)) {
              logIn(email, password)
                .then((payload) => {
                  const { notFound, id, firstName, lastName } = payload;
                  console.log('payload', payload);
                  if (!!notFound) {
                    toastr.info('No user found with those credentials');
                    return;
                  }
                  logInSuccess(
                    id,
                    firstName,
                    lastName
                  );
                  const chosenVariation = cxApi.chooseVariation();
                  switch (chosenVariation) {
                    case 0: {
                      ga('send', 'event', 'usingversion', 'A')
                      navigate('/dash/main');
                      return;
                    }

                    case 1: {
                      ga('send', 'event', 'usingversion', 'B')
                      navigate('/dash/mainOld');
                      return;
                    }

                    default: {
                      throw new Error(`Invalid chosenVariation: ${chosenVariation}`);
                    }
                  }
                })
                .catch((error) => {
                  console.log('error', error);
                  toastr.error('Server Error please try again');
                });

            }
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
  state,
});
const dispatchToProps = (dispatch) => ({
  goToSignup: () => {
    dispatch(push('/signup'));
  },
  logInSuccess: (id, firstName, lastName) => {
    // if (hasValidCredentials(email, password)) {
    // }
    dispatch(UserActions.loggedIn(id, firstName, lastName));
  },
  showDialog: () => {
    dispatch(LoginActions.showDialog());
  },
  hideDialog: () => {
    dispatch(LoginActions.hideDialog());
  },
  navigate: (url) => {
    dispatch(push(url));
  },
});

LoginCard = connect(
  stateToProps,
  dispatchToProps
)(LoginCard);

export default LoginCard;