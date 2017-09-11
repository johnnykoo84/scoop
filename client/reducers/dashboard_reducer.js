import {
  FETCH_DASHBOARD,
} from '../actions/types';

export default function (state = {}, action) {
  console.log('action.type', action.type)
  console.log('action.payload', action.payload)
  switch (action.type) {
    case FETCH_DASHBOARD:
      return { ...state, info: action.payload };

    default:
      return state;
  }
}
