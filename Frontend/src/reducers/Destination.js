/**
 * @author Anthony Altieri on 10/26/16.
 */


const initialState = {
  step: 1,
};

const Destination = (state = initialState, action) => {
  switch (action.type) {
    case 'GO_STEP_ONE': {
      return {
        ...state,
        step: 1,
      }
    }
    case 'GO_STEP_TWO': {
      return {
        ...state,
        step: 2,
      }
    }
    case 'GO_STEP_THREE': {
      return {
        ...state,
        step: 3,
      }
    }
    case 'ENTERED_CITY': {
      return {
        ...state,
        city: action.city,
      }
    }
    case 'ENTERED_CROSS_STREET': {
      return {
        ...state,
        crossStreet: action.crossStreet,
      }
    }
    case 'REMOVED_CROSS_STREET': {
      return {
        ...state,
        crossStreet: '',
      }
    }
    case 'CLEAR_DESTINATION': {
      return {}
    }

    default: {
      return state;
    }
  }
};

export default Destination;
