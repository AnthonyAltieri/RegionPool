/**
 * @author Anthony Altieri on 11/1/16.
 */

import mongoose, { Schema } from 'mongoose';
import CreditCard from './CreditCard';

const User = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  loggedIn: Boolean,
  phoneNumber: String,
  passwordResetCode: String,
  creditCard: CreditCard,
  picture: {
    data: Buffer,
    contentType: String,
  }
});

export default User;
