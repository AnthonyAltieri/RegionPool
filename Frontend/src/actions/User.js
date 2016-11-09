/**
 * @author Anthony Altieri on 11/1/16.
 */


export const loggedIn = (id, firstName, lastName) => ({
  type: 'LOGGED_IN',
  id,
  firstName,
  lastName,
});

export const signedUp = (id, firstName, lastName) => ({
  type: 'SIGNED_UP',
  id,
  firstName,
  lastName,
});

export const retrievedCurrentLocation = (lat, long) => ({
  type: 'RETRIEVED_CURRENT_LOCATION',
  lat,
  long,
});

export const setCurrentLocationInterval = (interval) => ({
  type: 'SET_CURRENT_LOCATION_INTERVAL',
  interval,
})
