import types from '../actions/types';

const DEFAULT_STATE = {
   user: false,
   signInError: '',
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.LOGIN_APP:
         return { ...state, user: true}
      case types.ERROR_LOGIN:
         return {...state, user: false, signInError: action.error}
      default:
         return state;
   }
}