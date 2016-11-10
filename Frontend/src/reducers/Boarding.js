/**
 * @author Anthony Altieri on 11/3/16.
 */

const Boarding = (state = {}, action) => {
  switch (action.type) {
    case 'START_TIMER': {
      return {
        ...state,
        timer: 60,
      }
    }

    case 'DECREMENT_TIMER': {
      return {
        ...state,
        timer: state.timer - 1,
      }
    }

    case 'SET_TIMER_INTERVAL': {
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

export default Boarding;
