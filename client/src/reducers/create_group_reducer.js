import types from '../actions/types';

const DEFAULT_STATE = {
   validName: false,
   invalidName: '',
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.VALID_GROUPNAME:
         return {...state, validName: true}
      case types.GROUPNAME_ALREADY_EXIST:
         return {...state, invalidName: action.error}
      default:
         return state;
   }
}