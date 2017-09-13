import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import selectSpaceReducer from './select_space_reducer';

const rootReducer = combineReducers({
  // form: reducer //  ES5
  form, // ES6
  auth: authReducer, // always it is up to me to make key and value the same
  spacelist: selectSpaceReducer,
});

export default rootReducer;
