/**
 * @author Anthony Altieri on 10/23/16.
 */

import React from 'react';
import LoginCard from './LoginCard';
import SignupCard from './SignupCard';
import { connect } from 'react-redux';

let Initial = ({ pathname }) => {
  return (
    <div
      className="fullscreen background-primary
    initial c center"
    >
      {pathname === '/login'
        ? <LoginCard />
        : <SignupCard />
      }
    </div>
  );
};

const stateToProps = (state) => ({
  pathname: state.routing.locationBeforeTransitions.pathname,

});
const dispatchToProps = (dispatch) => ({
});

Initial = connect(
  stateToProps,
  dispatchToProps
)(Initial);


export default Initial;
