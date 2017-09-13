import axios from 'axios';

import {
  FETCH_DASHBOARD_INFO,
  REQ_DASHBOARD_ERROR,
} from './types';

const ROOT_URL = 'http://localhost:3001/api';

export const reqDashboardError = (error) => {
  return {
    type: REQ_DASHBOARD_ERROR,
    payload: error,
  };
};

export const fetchSpaceData = (spaceName, callback) => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/dashboard?name=${spaceName}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then((response) => {
        console.log('res from server', response);
        dispatch({
          type: FETCH_DASHBOARD_INFO,
          payload: response.data,
        });
        callback();
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch(reqError(error.response.data));
      });
  };
};
