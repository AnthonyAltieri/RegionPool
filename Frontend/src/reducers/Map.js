/**
 * @author Anthony Altieri on 11/9/16.
 */

const Map = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MAP_POLYGONS': {
      return {
        ...state,
        polygons: action.polygons,
      }
    }

    default: {
      return state;
    }
  }
};
