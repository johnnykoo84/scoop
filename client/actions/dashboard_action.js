import axios from 'axios';

import {
  FETCH_SPACE_LIST,
  FETCH_DASHBOARD_INFO,
} from './types';

const ROOT_URL = 'http://localhost:3001/api';

export const fetchSpaceList = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/dashboard`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then((response) => {
        dispatch({
          type: FETCH_SPACE_LIST,
          payload: response.data,
        });
      });
  };
}

export const fetchDashboardInfo = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/space`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then((response) => {
        dispatch({
          type: FETCH_DASHBOARD_INFO,
          payload: response.data,
        });
      });
  };
}

export const addSpace = (spaceName) => {
  console.log('spaceName', spaceName);
  console.log('token', localStorage.getItem('token'))
  return (dispatch) => {
    axios.post(`${ROOT_URL}/space`, {
      spaceName,
      token: localStorage.getItem('token'),
    })
      .then((response) => {
        dispatch({
          type: FETCH_SPACE_LIST,
          payload: response.data,
        });
      });
  };
}
