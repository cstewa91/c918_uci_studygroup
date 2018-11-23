import types from '../actions/types';

const DEFAULT_STATE = {
   joined: [],
   created: []
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.GET_CREATED_GROUPS:
         return { ...state, created: action.payload.data }
      case types.GET_JOINED_GROUPS:
         return { ...state, joined: action.payload.data }
      default:
         return state;
   }
}