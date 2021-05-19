import { ADD_NEW_REQUEST, GET_ALL_REQUESTS, DELETE_REQUEST, EDIT_REQUEST } from '../types';

export const addNewRequest = (request) => {
  return {
    type: ADD_NEW_REQUEST,
    payload: request
  }
}

export const getAllRequests = (requests) => {
  return {
    type: GET_ALL_REQUESTS,
    payload: requests
  }
}

export const editRequest = (request) => {
  return {
    type: EDIT_REQUEST,
    payload: request
  }
}

export const deleteRequests = (requestID) => {
  return {
    type: DELETE_REQUEST,
    payload: requestID
  }
}

