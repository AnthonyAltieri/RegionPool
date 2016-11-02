/**
 * @author Anthony Altieri on 11/1/16.
 */

import mongoose, { Schema } from 'mongoose';

const User = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  loggedIn: Boolean,
  phoneNumber: String,
});

export default User;