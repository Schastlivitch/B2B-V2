import { loginUser, editProfile, addToFav } from "../AC/userAC"

export const authCheckThunk = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8080/user/authcheck', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
  })
  if (response.status === 200) {
    const currentUser = await response.json()
    dispatch(loginUser(currentUser))
  }
}

export const editProfileThunk = (ID, changes) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8080/user/lk/${ID}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      changes
    })
  })
  if (response.status === 200) {
    const token = await response.json()
    localStorage.setItem('token', `${token.accessToken}`)
    dispatch(editProfile(changes))
  }
}

export const addToFavThunk = (userID, partnerID) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8080/user/addtofav`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userID, partnerID
    })
  })
  if (response.status === 200) {
    const token = await response.json()
    localStorage.setItem('token', `${token.accessToken}`)
    dispatch(addToFav(partnerID))
  }
}



