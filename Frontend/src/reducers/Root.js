/**
 * @author Anthony Altieri on 10/26/16.
 */

import { combineReducers } from 'redux';
import {reducer as Toastr} from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux';
import Drawer from './Drawer';
import Destination from './Destination';
import Finish from './Finish';
import Login from './Login';
import User from './User';
import Boarding from './Boarding';
import Loading from './Loading';

const Root = combineReducers({
  toastr: Toastr,
  routing: routerReducer,
  Login,
  Drawer,
  Destination,
  Finish,
  User,
  Boarding,
  Loading,
});

export default Root;