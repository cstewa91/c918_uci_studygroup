import types from '../actions/types';

const DEFAULT_STATE = {
   joined: [],
   created: [],
   all: [],
   groups: 'all',
   joinedGroup: true,
   createdGroup: true
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.GET_CREATED_GROUPS:
         return { ...state, created: action.payload.data, createdGroup: true }
      case types.GET_JOINED_GROUPS:
         return { ...state, joined: action.payload.data , joinedGroup: true}
      case types.NO_JOINED_GROUPS:
         return {...state, joinedGroup: false}
      case types.NO_CREATED_GROUPS:
         return {...state, createdGroup: false}
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