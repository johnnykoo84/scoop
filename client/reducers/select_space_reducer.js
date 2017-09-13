import {
  FETCH_SPACE_LIST,
  REQ_SPACELIST_ERROR,
  SELECT_CURRENT_SPACE,
} from '../actions/types';

export default function (state = {}, action) {
  console.log('action paylod', action.payload)
  switch (action.type) {
    case FETCH_SPACE_LIST:
      return { ...state, info: action.payload };
    case REQ_SPACELIST_ERROR:
      return { ...state, error: action.payload };
    case SELECT_CURRENT_SPACE:
      return { ...state, selectedSpace: action.payload };
    default:
      return state;
  }
}
