import { combineReducers } from 'redux';
import common from './reducers/common';
import auth from './reducers/auth'
import user from './reducers/user'
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  user,
  router: routerReducer
});
