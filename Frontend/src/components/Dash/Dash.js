/**
 * @author Anthony Altieri on 10/26/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import * as DrawerActions from '../../actions/Drawer'

let Dash = ({
  isDrawerOpen,
  openDrawer,
  closeDrawer,
  children
}) => {
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
};
const stateToProps = (state) => ({
  isDrawerOpen: state.Drawer,
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
  }
});

Dash = connect(
  stateToProps,
  dispatchToProps
)(Dash);

export default Dash;
