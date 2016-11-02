/**
 * @author Anthony Altieri on 10/26/16.
 */

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as DrawerActions from '../../actions/Drawer'
import Avatar from 'material-ui/Avatar';


class Dash extends Component {
  componentDidMount() {
    const { closeDrawer } = this.props;
    closeDrawer();
  }

  render() {
    const { isDrawerOpen, openDrawer, closeDrawer,
      logOut, children, name } = this.props;

    return (
      <div>
        <Drawer
          docked={false}
          open={isDrawerOpen}
          overlayClassName="drawer-overlay"
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "row-reverse",
            }}
          >
            <IconButton
              onClick={() => {
                closeDrawer();
              }}
            >
              <FontIcon
                className="material-icons"
              >
                close
              </FontIcon>
            </IconButton>
          </div>
          <div className="c center">
            <Avatar
              size={100}
              src={require('../../../img/anthony.png')}
            />
            <h3
              style={{
                fontWeight: "300",
                fontSize: "1.8em",
                marginTop: "8px",
                marginBottom: "12px",
              }}
            >
              {name}
            </h3>
          </div>

          <MenuItem
            leftIcon={
              <FontIcon className="material-icons">
                do_not_disturb
              </FontIcon>
            }
            onClick={() => {
              logOut();
            }}
          >
            Log Out
          </MenuItem>
          {/*<MenuItem*/}
          {/*leftIcon={*/}
          {/*<FontIcon className="material-icons">*/}
          {/*settings*/}
          {/*</FontIcon>*/}
          {/*}*/}
          {/*>*/}
          {/*Settings*/}
          {/*</MenuItem>*/}
        </Drawer>
        <AppBar
          title="RegionPool"
          iconElementLeft={
            <IconButton
              onClick={() => {
                openDrawer();
              }}
            >
              <FontIcon
                className="material-icons"
              >
                menu
              </FontIcon>
            </IconButton>
          }

        />
        {children}
      </div>
    );
  }
}
const stateToProps = (state) => ({
  isDrawerOpen: state.Drawer,
  name: `${state.User.firstName} ${state.User.lastName}`,
});
const dispatchToProps = (dispatch) => ({
  openDrawer: () => {
    dispatch(DrawerActions.openDrawer());
    const overlay = document.getElementsByClassName('drawer-overlay')[0];
    overlay.onclick = () => dispatch(DrawerActions.closeDrawer());
    overlay.style.cursor = 'pointer';
  },
  closeDrawer: () => {
    dispatch(DrawerActions.closeDrawer());
  },
  logOut: () => {
    dispatch(push('/login'));
  }
});

Dash = connect(
  stateToProps,
  dispatchToProps
)(Dash);

export default Dash;
