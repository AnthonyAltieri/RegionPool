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

    case 'RETRIEVED_CURRENT_LOCATION': {
      return {
        ...state,
        lat: action.lat,
        long: action.long,
      }
    }

    case 'SET_CURRENT_LOCATION_INTERVAL': {
      return {
        ...state,
        interval: action.interval,
      }
    }

    default: {
      return state;
    }
  }
};

export default User;
