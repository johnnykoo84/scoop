import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
const ROOT_URL = 'http://localhost:3001/api';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

export function signinUser({ email, password }, callback) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // if request is good...
        // - update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        callback();
      })
      .catch(() => {
        // if request is bad...
        // - show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}
export function signupUser({ email, password }, callback) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then((response) => {
        console.log('response', response)
        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', response.data.token);

        callback();
      })
      // destructing ES6
      // .catch(({response}) => {
      //   console.log('this is a response', response)
      //   dispatch(authError(response.data.error));
      // });
      .catch((error) => {
        console.log('error?', error)
        dispatch(authError(error.response.data));
      });
  }
}

export function authError(error) {
  console.log('authError', error)
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

// with redux-thunk
export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      });
  }
}

// with redux-promise
// export function fetchMessage() {
//   const request = axios.get(ROOT_URL, {
//     headers: { authorization: localStorage.getItem('token') }
//   });
//
//   return {
//     type: FETCH_MESSAGE,
//     payload: request
//   }
// }
