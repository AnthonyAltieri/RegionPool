/**
 * @author Anthony Altieri on 10/23/16.
 */

import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../../node_modules/react-redux-toastr/src/less/index.less';
import {
 lightBlue500, lightBlue300, lightBlue700,
  teal500, pinkA200, grey100, grey300, grey400, grey500,
  darkBlack, white, fullBlack
} from '../../node_modules/material-ui/styles/colors';
import { fade } from '../../node_modules/material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: lightBlue500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,


  },
  fontFamily: 'Rubik, sans-serif',
  appbar: {
    height: 52,
  },
});

class AppWithToast extends Component {
  render() {
    const { children, isLoading } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {isLoading ? <Loading /> : ''}
          {children}
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            position="bottom-center"
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
AppWithToast = connect(
  (state) => ({
  })
)(AppWithToast);

export default AppWithToast;
