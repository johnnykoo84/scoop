import {
  FETCH_SPACE_LIST,
  REQ_ERROR,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SPACE_LIST:
      return { ...state, info: action.payload };
    case REQ_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
