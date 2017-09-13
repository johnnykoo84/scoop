import axios from 'axios';

import {
  FETCH_SPACE_LIST,
  REQ_SPACELIST_ERROR,
} from './types';

const ROOT_URL = 'http://localhost:3001/api';

export const fetchSpaceList = () => {
  return (dispatch) => {
    console.log('action fetch Space List!!! and token', localStorage.getItem('token'))
    axios.get(`${ROOT_URL}/selectspace`, {
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

export const reqSpaceListError = (error) => {
  return {
    type: REQ_SPACELIST_ERROR,
    payload: error,
  };
};

export const addSpace = (spaceName, callback) => {
  console.log('spaceName', spaceName);
  console.log('token', localStorage.getItem('token'))
  return (dispatch) => {
    axios.post(`${ROOT_URL}/selectspace`, {
      spaceName,
      token: localStorage.getItem('token'),
    })
      .then((response) => {
        console.log('response from the server?', response)
        dispatch({
          type: FETCH_SPACE_LIST,
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
