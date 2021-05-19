import { addNewRequest, getAllRequests, deleteRequests, editRequest } from '../AC/requestAC';


export const addNewRequestThunk = (request) => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8080/bar/requests', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...request})
  })
  if (response.status === 200) {
    dispatch(addNewRequest(request))
  }
}

export const getAllRequestsThunk = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8080/bar/requests', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (response.status === 200) {
    const allRequests = await response.json()
    dispatch(getAllRequests(allRequests))
  }
}

export const deleteRequestThunk = (requestID) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8080/bar/requests/${requestID}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (response.status === 200) {
    dispatch(deleteRequests(requestID))
  }
}

export const editRequestThunk = (request) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8080/bar/requests`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request)
  })
  if (response.status === 200) {
    dispatch(editRequest(request))
  }
}
