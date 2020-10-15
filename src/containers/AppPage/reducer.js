import { CHANGE_NAVIGATION_STATE } from './types';

const initialState = {
  menuOpen: false,
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAVIGATION_STATE:
      return { ...state, menuOpen: action.payload };
    default:
      return state;
  }
};

export default navigationReducer;
