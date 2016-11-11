/**
 * @author Anthony Altieri on 11/10/16.
 */

import mongoose, { Schema } from 'mongoose';

const CreditCard = new Schema({
  number: String,
  csv: String,
  name: String,
});

export default CreditCard;
