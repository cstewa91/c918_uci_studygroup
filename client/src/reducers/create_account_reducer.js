import types from '../actions/types';

const DEFAULT_STATE = {
   account: false,
   validUsername: '',
   validEmail: ''
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.CREATE_ACCOUNT:
         return { ...state, account: true }
      case types.USERNAME_ALREADY_EXISTS:
         return { ...state, validEmail: '', validUsername: action.error, account: false }
      case types.EMAIL_ALREADY_EXISTS:
         return { ...state, validUsername: '', validEmail: action.error, account: false }
      case types.USERNAME_AND_EMAIL_EXIST:
         return { ...state, validEmail: 'Email already in use', validUsername: 'Username already in use', account: false }
      default:
         return state;
   }
}