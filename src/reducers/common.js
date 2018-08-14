import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ADD_USER, UPDATE_USER, GET_USER
} from '../constants/actionTypes';

const defaultState = {
  appName: 'ReactDemo',
  token: null,
  viewChangeCounter: 0,
  projectName: 'ReactDemo'
};

export default (state = defaultState, action) => {
  console.log("ActionType: " + action.type);
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return {...state, redirectTo: null};
    case ADD_USER:
    case UPDATE_USER:
      this.errors = action.payload.errors;
      action.error =  (typeof(this.errors) !== 'undefined') && (this.errors.length > 0);
      if(action.error){
        return { ...state };
      }
      else{
        window.location.href='/users';
      }
      return {...state, redirectTo: action.error ? null : '/users'};
    case LOGOUT:
      window.location.href='/';
      return {...state, redirectTo: '/', token: null, currentUser: null};
    case LOGIN:
      this.errors = action.payload.errors;
      action.error =  (typeof(this.errors) !== 'undefined') && (this.errors.length > 0);
      return { ...state, redirectTo: action.error ? null : '/', currentUser: action.payload.user};
    case REGISTER:
      this.errors = action.payload.errors;
      action.error =  (typeof(this.errors) !== 'undefined') && (this.errors.length > 0);
      if(action.error){
        return { ...state };
      } else{
        alert('Registration complete. Please login.')
        window.location.href='/';
        return { ...state, redirectTo: '/'};
      }
    case GET_USER:
      this.errors = action.payload.errors;
      action.error =  (typeof(this.errors) !== 'undefined') && (this.errors.length > 0);
      return {...state, redirectTo: action.error ? '/users' : null };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {...state, viewChangeCounter: state.viewChangeCounter + 1};
    default:
      return state;
  }
};
