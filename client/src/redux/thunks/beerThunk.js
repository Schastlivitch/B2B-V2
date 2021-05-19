import { getAllBeers, addNewBeer, editBeer, deleteBeer } from '../AC/beerAC';


export const addNewBeerThunk = (beer) => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8080/brew/beers', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...beer})
  })
  if (response.status === 200) {
    dispatch(addNewBeer(beer))
  }
}

export const getAllBeersThunk = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8080/brew/beers', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (response.status === 200) {
    const allBeers = await response.json()
    dispatch(getAllBeers(allBeers))
  }
}

export const deleteBeerThunk = (beerID) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8080/brew/beers/${beerID}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (response.status === 200) {
    dispatch(deleteBeer(beerID))
  }
}

export const editBeerThunk = (beer) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8080/brew/beers`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(beer)
  })
  if (response.status === 200) {
    dispatch(editBeer(beer))
  }
}
