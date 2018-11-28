import types from '../actions/types';

const DEFAULT_STATE = {
   user: false
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.GET_USER_ID:
         return { ...state, user: action.payload.data }
      default:
         return state;
   }
}