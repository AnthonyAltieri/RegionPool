/**
 * @author Anthony Altieri on 11/3/16.
 */

const Boarding = (state = {}, action) => {
  switch (action.type) {
    case 'START_TIMER': {
      return {
        timer: 60,
      }
    }

    case 'DECREMENT_TIMER': {
      return {
        timer: state.timer - 1,
      }
    }

    default: {
      return state;
    }
  }
};

export default Boarding;
