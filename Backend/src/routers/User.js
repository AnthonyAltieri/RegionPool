/**
 * @author Anthony Altieri on 11/1/16.
 */

import db from '../db';
import UserSchema from '../schemas/User'
import { Router, model } from 'express';
import md5 from '../../node_modules/blueimp-md5/js/md5.min'
import fs from 'fs';
const SALT = 'Altieri';


const User = model('users', UserSchema);

const router = Router();
router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.post('/photo/upload', photoUpload);

function signUp(req, res) {
  const { firstName, lastName, email, password }  = req.body;

  // Deal with missing information or malicious POSTs
  if (!firstName || !lastName || !email || !password) {
    res.error({
      msg: 'Required information missing',
    });
  }

  db.findOne({
    username: email,
    password: encryptPassword(email, password)
    }, User)
    .then((foundUser) => {
      if (!!foundUser) {
        res.send({
          inUse: true,
        });
        return;
      }
      db.create({
        password: encryptPassword(email, password),
        loggedIn: true,
        email,
        firstName,
        lastName,
      }, User)
        .then((user) => {
          req.session.email = email;
          req.session.firstName = firstName;
          req.session.lastName = lastName;
          req.session.userId = user._id;
          res.send({
            id: user._id,
            email,
            firstName,
            lastName,
          });
        })
        .catch((error) => { res.error(error) })
    })
    .catch((error) => { res.error(error) })
}

function logIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.error({
      msg: 'Missing required information',
    });
    return;
  }

  db.findOne({
    password: encryptPassword(email, password),
    email,
  })
    .then((user) => {
      if (!user) {
        res.send(undefined);
        return;
      }
      const { firstName, lastName, _id } = user;
      req.session.email = email;
      req.session.firstName = firstName;
      req.session.lastName = lastName;
      req.session.userId = _id;
      res.success({
        id: _id,
        firstName,
        lastName,
      });
    })
    .catch((error) => { res.error(error) })
}

function encryptPassword(email, password) {
  return md5(password, null, true) + email + SALT;
}

export default router;
