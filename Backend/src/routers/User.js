/**
 * @author Anthony Altieri on 11/1/16.
 */

import UserSchema from '../schemas/User'
import { Router } from 'express';
import mongoose from 'mongoose';
import md5 from '../../node_modules/blueimp-md5/js/md5';
const SALT = 'Altieri';
import db from '../db'

const User = mongoose.model('users', UserSchema);

const router = Router();
router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.post('/logOut', logOut);
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

  console.log('email', email);
  console.log('password', password);

  if (!email || !password) {
    res.send({ notFound: true });
    return;
  }

  db.findOne({
    password: encryptPassword(email, password),
    email,
  }, User)
    .then((user) => {
      if (!user) {
        res.send({ notFound: true });
        return;
      }
      const { firstName, lastName, _id } = user;
      req.session.email = email;
      req.session.firstName = firstName;
      req.session.lastName = lastName;
      req.session.userId = _id;
      res.send({
        id: _id,
        firstName,
        lastName,
      });
    })
    .catch((error) => {
      console.log('logIn error', error.toString())
      res.error(error)
    })
}

function logOut(req, res) {
  const { userId } = req.session;
  if (!userId) {
    res.success();
    return
  }
  db.findById(userId, User)
    .then((user) => {
      user.loggedIn = false;
      db.save(user)
        .then((user) => {
          req.session.destroy((error) => {
            if (error) {
              res.error(error);
              return
            }
            res.success()
          })
        })
        .catch((error) => { res.error(error) })
    })
    .catch((error) => { res.error(error) })
}

// TODO: implement
function photoUpload(req, res) {
}

function encryptPassword(email, password) {
  return md5(password, null, true) + email + SALT;
}

module.exports = router;
