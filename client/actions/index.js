export * from './auth_action';
export * from './dashboard_action';

// import {
//   AUTH_USER,
//   UNAUTH_USER,
//   AUTH_ERROR,
//   FETCH_MESSAGE,
//   FETCH_SPACE_LIST,
//   FETCH_DASHBOARD_INFO,
// } from './types';

// const ROOT_URL = 'http://localhost:3001/api';


// export function signinUser({ email, password }, callback) {
//   return (dispatch) => {
//     // submit email/password to the server
//     axios.post(`${ROOT_URL}/signin`, { email, password })
//       .then((response) => {
//         // if request is good...
//         // - update state to indicate user is authenticated
//         dispatch({ type: AUTH_USER });
//         // - save the JWT token
//         localStorage.setItem('token', response.data.token);
//         // - redirect to the route '/feature'
//         callback();
//       })
//       .catch(() => {
//         // if request is bad...
//         // - show an error to the user
//         dispatch(authError('Bad Login Info'));
//       });
//   };
// }
// export function signupUser({ company, email, password }, callback) {
//   return (dispatch) => {
//     axios.post(`${ROOT_URL}/signup`, { company, email, password })
//       .then((response) => {
//         dispatch({ type: AUTH_USER });
//
//         localStorage.setItem('token', response.data.token);
//
//         callback();
//       })
//       // destructing ES6
//       // .catch(({response}) => {
//       //   console.log('this is a response', response)
//       //   dispatch(authError(response.data.error));
//       // });
//       .catch((error) => {
//         console.log(error.response.data)
//         dispatch(authError(error.response.data));
//       });
//   };
// }
//
// export function signoutUser(callback) {
//   localStorage.removeItem('token');
//
//   callback();
//
//   return { type: UNAUTH_USER };
// }
//
// export function authError(error) {
//   return {
//     type: AUTH_ERROR,
//     payload: error,
//   };
// }
//
//
// // with redux-thunk
// export function fetchMessage() {
//   return (dispatch) => {
//     axios.get(ROOT_URL, {
//       headers: { authorization: localStorage.getItem('token') }
//     })
//       .then((response) => {
//         dispatch({
//           type: FETCH_MESSAGE,
//           payload: response.data.message,
//         });
//       });
//   };
// }
//
// // with redux-promise
// // export function fetchMessage() {
// //   const request = axios.get(ROOT_URL, {
// //     headers: { authorization: localStorage.getItem('token') }
// //   });
// //
// //   return {
// //     type: FETCH_MESSAGE,
// //     payload: request
// //   }
// // }

// export function fetchSpaceList() {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/dashboard`, {
//       headers: { authorization: localStorage.getItem('token') }
//     })
//       .then((response) => {
//         dispatch({
//           type: FETCH_SPACE_LIST,
//           payload: response.data,
//         });
//       });
//   };
// }
//
// export function fetchDashboardInfo() {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/space`, {
//       headers: { authorization: localStorage.getItem('token') }
//     })
//       .then((response) => {
//         dispatch({
//           type: FETCH_DASHBOARD_INFO,
//           payload: response.data,
//         });
//       });
//   };
// }
//
// export function addSpace(spaceName) {
//   console.log('spaceName', spaceName);
//   console.log('token', localStorage.getItem('token'))
//   return (dispatch) => {
//     axios.post(`${ROOT_URL}/space`, {
//       spaceName,
//       token: localStorage.getItem('token'),
//     })
//       .then((response) => {
//         dispatch({
//           type: FETCH_SPACE_LIST,
//           payload: response.data,
//         });
//       });
//   };
// }
