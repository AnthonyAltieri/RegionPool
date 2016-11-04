/**
 * @author Anthony Altieri on 11/1/16.
 */

import { post } from './Ajax';

export const logIn = (email, password)  => {
    return new Promise((resolve, reject) => {
        post('/api/user/logIn', { email, password })
          .then((payload) => {
            if (!payload || payload.error) {
              resolve(null);
              return;
            }
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
