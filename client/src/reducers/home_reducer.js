import types from '../actions/types';

const DEFAULT_STATE = {
   joined: [],
   created: [],
   all: [],
   groups: 'all'
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.GET_CREATED_GROUPS:
         return { ...state, created: action.payload.data }
      case types.GET_JOINED_GROUPS:
         return { ...state, joined: action.payload.data }
      case types.SHOW_JOINED_GROUPS:
         return { ...state, groups: 'joined' }
      case types.SHOW_CREATED_GROUPS:
         return { ...state, groups: 'created' }
      case types.SHOW_CREATED_JOINED_GROUPS:
         return { ...state, groups: 'all'}
      default:
         return state;
   }
}