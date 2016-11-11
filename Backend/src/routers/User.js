/**
 * @author Anthony Altieri on 11/1/16.
 */

import UserSchema from '../schemas/User'
import CreditCardSchema from '../schemas/CreditCard'
import { Router } from 'express';
import mongoose from 'mongoose';
import md5 from '../../node_modules/blueimp-md5/js/md5';
import { v1 } from 'node-uuid';
const SALT = 'Altieri';
import db from '../db'
import nodemailer from 'nodemailer';

const User = mongoose.model('users', UserSchema);
const transporter = nodemailer.createTransport('smtps://RegionPool%40gmail.com:AsdfAsdf123@smtp.gmail.com');

const router = Router();
router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.post('/logOut', logOut);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/photo/upload', photoUpload);
router.post('/saveCreditCard', saveCreditCard);
router.post('/getCreditCard', getCreditCard);

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

function resetPassword(req, res) {
  const { passwordResetCode, newPassword } = req.body;
  if (!passwordResetCode) {
    res.send({
      error: true,
    });
    return
  }

  db.findOne({
    passwordResetCode,
  }, User)
    .then((user) => {
      user.password = encryptPassword(user.email, newPassword)
      db.save(user)
        .then((user) => {
          res.send({
            success: true,
          })
        })
        .catch((error) => { res.send({ error: true }) });
    })
    .catch((error) => { res.send({ error: true }) });
}

function forgotPassword(req, res) {
  const { recipientEmail } = req.body;
  console.log('mark1')
  if (!recipientEmail) {
    res.send({
      invalidRecipient: true,
    });
    return;
  }
  console.log('mark2')
  db.findOne({
    email: recipientEmail,
  }, User)
    .then((user) => {
      console.log('mark3')
      if (!user) {
        console.log('couldn\'t find user');
        res.send({
          invalidRecipient: true,
        });
        return;
      }
      console.log('mark4')
      const resetCode = v1();
      user.passwordResetCode = resetCode;
      console.log('user', JSON.stringify(user));
      db.save(user)
        .then((user) => {
          console.log('mark5')
          const mailOptions = {
            from: '"RegionPool" <RegionPool@gmail.com>',
            to: `${recipientEmail}`,
            subject: 'Reset password for RegionPool account',
            text: 'Please follow the link to reset your email',
            html: `<a href="http://localhost:3000/forgotPassword/${resetCode}">Reset Password</a>`
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.send({
                error: true,
              })
              console.log('email sent successfully, info', info);
              return;
            }
            res.send({
              success: true,
            })
          })
        })
        .catch((error) => {
          console.log('SAVE ERROR', error)
        })
    })
}

function saveCreditCard(req, res) {
  console.log('save credit card');
  const { number, csv, name, userId } = req.body;
  db.findById(userId, User)
    .then((user) => {
      if (!user) {
        res.send({
          error: true,
        });
        return;
      }
      user.creditCard = {
        number,
        csv,
        name,
      };
      db.save(user)
        .then((user) => {
          res.send({
            success: true,
          })
        })
        .catch((error) => {
          res.send({
            error: true
          })
        })
    })
    .catch((error) => {
      console.log('error', error);
      res.send({
        error: true
      })
    })
}

function getCreditCard(req, res) {
  const { userId } = req.body;

  db.findById(userId, User)
    .then((user) => {
      if (!user) {
        res.send({
          error: true,
        });
        return;
      }
      if (!user.creditCard) {
        res.send({
          noCreditCard: true,
        });
        return;
      }
      res.send({
        number: user.creditCardNumber,
        csv: user.creditCardCsv,
        name: user.creditCardName,
      });
    })
    .catch((error) => {
      res.send({
        error: true
      })
    })

};

// TODO: implement
function photoUpload(req, res) {
}

function encryptPassword(email, password) {
  return md5(password, null, true) + email + SALT;
}

module.exports = router;
