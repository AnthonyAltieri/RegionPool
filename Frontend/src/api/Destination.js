/**
 * @author Anthony Altieri on 11/3/16.
 */

import { post } from './Ajax';

export const getCrossStreets = () => {
  return new Promise((resolve, reject) => {
    post('/data.json')
      .then((response) => { resolve(response.payload) })
      .catch((error) => { reject(error) })
  });
};
