import { getAllBeers, addNewBeer, editBeer, deleteBeer } from "../AC/beerAC";

export const addNewBeerThunk = (img, randomNum, beer) => async (dispatch, getState) => {
  console.log(img, 'IMAGE===================================>')
  const response = await fetch("http://localhost:8080/brew/beers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...beer }),
  });
  if (response.status === 200) {
    if (img) {
      const formData = new FormData();
      formData.append("beerImg", img, randomNum);
      const responseBeerImg = await fetch("http://localhost:8080/brew/setBeerImage", {
        method: "PATCH",
        body: formData,
      });
      if (responseBeerImg.status === 200) {
        dispatch(addNewBeer(beer));
      }
    } else {
      dispatch(addNewBeer(beer));
    }
  }
};

export const getAllBeersThunk = () => async (dispatch, getState) => {
  const response = await fetch("http://localhost:8080/brew/beers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const allBeers = await response.json();
    dispatch(getAllBeers(allBeers));
  }
};

export const deleteBeerThunk = (beerID) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8080/brew/beers/${beerID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    dispatch(deleteBeer(beerID));
  }
};

export const editBeerThunk = (img, randomNum, beer) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8080/brew/beers`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(beer),
  });
  if (response.status === 200) {
    if (img) {
      console.log(img)
      const formData = new FormData();
      formData.append("beerImg", img, randomNum);
      const responseBeerImg = await fetch("http://localhost:8080/brew/setBeerImage", {
        method: "PATCH",
        body: formData,
      });
      if (responseBeerImg.status === 200) {
        dispatch(editBeer(beer));
      }
    } else {
      dispatch(editBeer(beer));
    }
  }
};
