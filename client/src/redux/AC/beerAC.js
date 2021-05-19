import { ADD_NEW_BEER, GET_ALL_BEERS, EDIT_BEER, DELETE_BEER } from '../types';

export const addNewBeer = (beer) => {
  return {
    type: ADD_NEW_BEER,
    payload: beer
  }
}

export const getAllBeers = (beers) => {
  return {
    type: GET_ALL_BEERS,
    payload: beers
  }
}

export const editBeer = (beer) => {
  return {
    type: EDIT_BEER,
    payload: beer
  }
}

export const deleteBeer = (beerID) => {
  return {
    type: DELETE_BEER,
    payload: beerID
  }
}

