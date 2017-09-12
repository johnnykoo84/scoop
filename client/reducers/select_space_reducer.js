import {
  FETCH_SPACE_LIST,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SPACE_LIST:
      return { ...state, info: action.payload };

    default:
      return state;
  }
}
