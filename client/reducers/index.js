import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  // form: reducer //  ES5
  form, // ES6
  auth: authReducer // always it is up to me to make key and value the same
});

export default rootReducer;
