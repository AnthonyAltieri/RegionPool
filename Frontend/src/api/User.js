/**
 * @author Anthony Altieri on 11/1/16.
 */


import { post } from './Ajax';

export const logIn = (email, password)  => {
    return new Promise((resolve, reject) => {
        post('/api/user/logIn', { email, password })
          .then((payload) => {
            console.log('payload === ', payload);
            resolve(payload);
          })
          .catch((error) => { reject(error) });
    })
};


export const signUp = (email, password, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    post('/api/user/signUp', { firstName, lastName, email, password })
      .then((payload) => {
        const { error, inUse } = payload;
        if (!!error) {
          resolve({
            error,
          });
          return;
        }
        if (!!inUse) {
          resolve({
            inUse,
          });
          return;
        }
        resolve(payload);
      })
      .catch((error) => { reject(error) });
  })
};

export const logOut = () => {
  return new Promise((resolve, reject) => {
    post('/api/user/logOut', {})
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  })
};

export const resetPassword = (passwordResetCode, newPassword) => {
  return new Promise((resolve, reject) => {
    post('/api/user/resetPassword', { passwordResetCode, newPassword })
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  })
};

export const forgotPassword = (recipientEmail) => {
  return new Promise((resolve, reject) => {
    post('/api/user/forgotPassword', { recipientEmail })
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  });
};

export const getCreditCard = (userId) => {
  return new Promise((resolve, reject) => {
    post('/api/user/getCreditCard', { userId })
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  })
};

export const saveCreditCard = (number, csv, name, userId) => {
  return new Promise((resolve, reject) => {
    post('/api/user/saveCreditCard', { number, csv, name, userId })
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  })
};
