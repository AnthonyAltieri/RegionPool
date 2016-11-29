/**
 * @author Anthony Altieri on 11/1/16.
 */

const User = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNED_UP':
    case 'LOGGED_IN': {
      return {
        ...state,
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
      }
    }

    case 'MARKER_SET': {
      return {
        ...state,
        isMarkerSet: true,
      }
    }

    case 'MARKER_CLEAR': {
      return {
        ...state,
        isMarkerSet: false,
      }
    }

    case 'RETRIEVED_CURRENT_LOCATION': {
      return {
        ...state,
        lat: action.lat,
        long: action.long,
      }
    }

    case 'SET_CURRENT_ZONE': {
      return {
        ...state,
        zone: action.zone,
      }
    }

    case 'SET_CREDIT_CARD': {
      return {
        ...state,
        creditCard: action.creditCard
      }
    }

    case 'SET_CURRENT_LOCATION_INTERVAL': {
      return {
        ...state,
        interval: action.interval,
      }
    }

    case 'SET_LOCATION_STATUS': {
      return {
        ...state,
        isInPickupZone: action.isInPickupZone,
      }
    }

    default: {
      return state;
    }
  }
};

export default User;
