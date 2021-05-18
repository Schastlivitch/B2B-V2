import { LOGIN_USER, LOGOUT_USER, EDIT_PROFILE } from '../types';

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  }
}

export const editProfile = (changes) => {
  return {
    type: EDIT_PROFILE,
    payload: changes
  }
}
