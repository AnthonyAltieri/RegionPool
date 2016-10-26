/**
 * @author Anthony Altieri on 10/26/16.
 */


const Drawer = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_DRAWER': {
      return true;
    }
    case 'CLOSE_DRAWER': {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default Drawer;