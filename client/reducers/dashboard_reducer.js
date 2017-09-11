import {
  FETCH_DASHBOARD,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_DASHBOARD:
      return { ...state, info: action.payload };

    default:
      return state;
  }
}
