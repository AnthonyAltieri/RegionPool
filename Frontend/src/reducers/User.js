/**
 * @author Anthony Altieri on 11/1/16.
 */

const User = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNED_UP':
    case 'LOGGED_IN': {
      return {
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
      }
    }

    default: {
      return state;
    }
  }
};

export default User;
