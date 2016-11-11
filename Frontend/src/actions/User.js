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

export const setCreditCard = (number, csv, name) => ({
  type: 'SET_CREDIT_CARD',
  creditCard: {
    name,
    csv,
    number
  }
});

export const setCurrentZone = (zone) => ({
  type: 'SET_CURRENT_ZONE',
  zone,
});

export const retrievedCurrentLocation = (lat, long) => ({
  type: 'RETRIEVED_CURRENT_LOCATION',
  lat,
  long,
});

export const setLocationStatus = (isInPickupZone) => ({
  type: 'SET_LOCATION_STATUS',
  isInPickupZone,
});

export const setCurrentLocationInterval = (interval) => ({
  type: 'SET_CURRENT_LOCATION_INTERVAL',
  interval,
})
