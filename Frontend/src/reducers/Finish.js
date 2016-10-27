/**
 * @author Anthony Altieri on 10/27/16.
 */

const Finish = (state = {}, action) => {
  switch (action.type) {
    case 'SET_STARS': {
      return {
        ...state,
        stars: action.stars,
      }
    }


    default: {
      return state;
    }
  }
};

export default Finish;
