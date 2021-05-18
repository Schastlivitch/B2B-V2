import { loginUser, editProfile } from "../AC/userAC"

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
    dispatch(editProfile(changes))
  }
}



