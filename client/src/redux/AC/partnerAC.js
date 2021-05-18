import { GET_ALL_BARS, GET_ALL_BREWS } from '../types';

export const getAllBars = (bars) => {
  return {
    type: GET_ALL_BARS,
    payload: bars
  }
}

export const getAllBrews = (brews) => {
  return {
    type: GET_ALL_BREWS,
    payload: brews
  }
}
