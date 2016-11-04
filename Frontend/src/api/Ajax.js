/**
 * @author Anthony Altieri on 11/1/16.
 */

const SERVER_PREFIX = 'http://35.161.34.206';
const LOCAL_PREFIX = 'http://localhost:4040';

export const post = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    send('POST', url, params, true)
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) });
  })
};

export const send = (type, url, params = {}, withCredentials = false)  => {
  console.log('send()')
  return new Promise((resolve, reject) => {
    const ajax = new XMLHttpRequest();
    ajax.open(type, LOCAL_PREFIX + url, true);
    ajax.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    ajax.withCredentials = withCredentials;
    ajax.onreadystatechange = () => {
      if (ajax.readyState !== XMLHttpRequest.DONE) return;
      const isFivehundred = (code) => code >= 500 && code <= 599;
      const isZero = (code) => code === 0;
      if (isFivehundred(ajax.status)) {
        reject({
          code: 500,
          error: {
            code: 500,
            info: 'Server Error',
          }
        });
      }
      else if (isZero(ajax.status)) {
        reject({
          code: 0,
          error: {
            code: 0,
            info: 'No Connection Error',
          }
        });
      }

      else {
        try {
          const payload = JSON.stringify(ajax.response);
          resolve({
            code: ajax.status,
            payload,
          })
        } catch (error) {

          reject({
            code: undefined,
            error,
          })
        }
      }
    };
    let parameters;
    try {
      if (!!params) {
        parameters = JSON.stringify(params)
      }
    } catch (e) {
      reject({
        error: {
          code: null,
          info: 'Stringify Failed: ' + e
        }
      });
    }
    ajax.send(parameters);
    return;
  })
};

