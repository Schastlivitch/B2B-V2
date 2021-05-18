import { LOGIN_USER, LOGOUT_USER, GET_ALL_BARS, GET_ALL_BREWS, EDIT_PROFILE } from '../types';

const loginReducer = (state, action) => {
  switch (action.type) {

    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      }

    case LOGOUT_USER:
      return {
        ...state,
        user: {}
      }

    case GET_ALL_BARS:
      return {
        ...state,
        bars: action.payload
      }

    case GET_ALL_BREWS:
      return {
        ...state,
        brews: action.payload
      }

    case EDIT_PROFILE:
      return {
        ...state,
        user: {...state.user, ...action.payload}
      }

    default:
      return state;
  }
};

export default loginReducer;
