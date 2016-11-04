/**
 * @author Anthony Altieri on 11/3/16.
 */

const Loading = (state = false, action) => {
  switch (action.type) {
    case 'START_LOADING': {
      return true;
    }
    case 'STOP_LOADING': {
      return false;
    }

    default: {
      return state;
    }
  }
};

export default Loading;
