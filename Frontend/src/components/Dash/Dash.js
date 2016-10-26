/**
 * @author Anthony Altieri on 10/26/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const Dash = ({
  isDrawerOpen,
  children
}) => {
  return (
    <div>
      <Drawer
        docked={false}
        width={200}
      />
      }
      <AppBar
        title="RegionPool"
      />
      {children}
    </div>
  );
};

export default Dash;
