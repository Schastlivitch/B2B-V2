import { getAllBars, getAllBrews } from "../AC/partnerAC"

export const getAllBarsThunk = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8080/brew/allbars', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.status === 200) {
    const allBars = await response.json()
    dispatch(getAllBars(allBars))
  }
}

export const getAllBrewsThunk = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8080/bar/allbrewers', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.status === 200) {
    const allBrews = await response.json()
    dispatch(getAllBrews(allBrews))
  }
}

