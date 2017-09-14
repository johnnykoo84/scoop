import {
  FETCH_DASHBOARD_INFO,
} from '../actions/types';

export default function (state = {}, action) {
  console.log('action', action.type, action.payload)
  switch (action.type) {
    case FETCH_DASHBOARD_INFO:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
