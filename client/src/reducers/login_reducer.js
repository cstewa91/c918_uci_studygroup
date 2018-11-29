import types from '../actions/types';

const DEFAULT_STATE = {
   user: ""
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.LOGIN_APP:
         return { ...state, user: "valid" }
      case types.ERROR_LOGIN:
         return {...state, user: "invalid"}
      default:
         return state;
   }
}