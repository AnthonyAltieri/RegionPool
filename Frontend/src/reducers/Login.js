/**
 * @author Anthony Altieri on 10/27/16.
 */

const Login = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_DIALOG': {
      return {
        ...state,
        isDialogeOpen: true,
      }
    }
    case 'HIDE_DIALOG': {
      return {
        ...state,
        isDialogeOpen: false,
      }
    }
    default: {
      return state;
    }
  }
};

export default Login;
