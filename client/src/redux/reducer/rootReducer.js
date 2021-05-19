import {
  LOGIN_USER, LOGOUT_USER, GET_ALL_BARS, GET_ALL_BREWS, EDIT_PROFILE, ADD_NEW_REQUEST,
  GET_ALL_REQUESTS, DELETE_REQUEST, EDIT_REQUEST, GET_ALL_BEERS, ADD_NEW_BEER, EDIT_BEER, DELETE_BEER, ADD_TO_FAV,

} from '../types';

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
        user: { ...state.user, ...action.payload }
      }

    case ADD_TO_FAV:
      return {
        ...state,
        user: { ...state.user, favourites: [...state.user.favourites, action.payload] }
      }

    case GET_ALL_REQUESTS:
      return {
        ...state,
        requests: [...action.payload]
      }

    case ADD_NEW_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload]
      }

    case EDIT_REQUEST:
      return {
        ...state,
        requests: state.requests.map(request => {
          if (request._id === action.payload._id) {
            return { ...request, ...action.payload }
          }
          return request
        })
      }

    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(request => request._id !== action.payload)
      }

    case GET_ALL_BEERS:
      return {
        ...state,
        beers: [...action.payload]
      }

    case ADD_NEW_BEER:
      return {
        ...state,
        beers: [...state.beers, action.payload]
      }

    case EDIT_BEER:
      return {
        ...state,
        beers: state.beers.map(beer => {
          if (beer._id === action.payload._id) {
            return { ...beer, ...action.payload }
          }
          return beer
        })
      }

    case DELETE_BEER:
      return {
        ...state,
        beers: state.beers.filter(beer => beer._id !== action.payload)
      }

    default:
      return state;
  }
};

export default loginReducer;
