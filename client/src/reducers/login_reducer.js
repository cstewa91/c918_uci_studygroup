import types from '../actions/types';

const DEFAULT_STATE = {
   auth: false,
   signInError: '',
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.LOGIN_APP:
      case types.CREATE_ACCOUNT:
         return { ...state, auth: true}
      case types.ERROR_LOGIN:
         return {...state, auth: false, signInError: action.error}
      case types.SIGN_OUT:
         return {
            auth: false
         }
      default:
         return state;
   }
}
