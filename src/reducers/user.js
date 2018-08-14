import {
  DELETE_USER,
  USER_PAGE_LOADED,
  ADD_USER, USER_PAGE_UNLOADED, GET_USER, UPDATE_USER
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      action.error = true;
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
        user: action.payload ? action.payload.user : null
      };
    case USER_PAGE_LOADED:
      action.error = true;
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
        users: action.payload ? action.payload.users : []
      };
    case DELETE_USER:
      action.error = true;
      return {
          ...state,
          inProgress: false,
          errors: action.error ? action.payload.errors : null,
          users: state.users.filter(user => user.id !== parseInt(action.userId, 0))
      };
    case ADD_USER:
    case UPDATE_USER:
      this.errors = action.payload.errors;
      action.error =  (typeof(this.errors) !== 'undefined') && (this.errors.length > 0);
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case USER_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
