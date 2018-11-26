import types from '../actions/types';

const DEFAULT_STATE = {
   username: '',
   firstname: '',
   lastname: '',
   email:'',
   
}

export default (state = DEFAULT_STATE, action) => {
   switch (action.type) {
      case types.GET_USER_INFO:
         return { ...state, profile: action.payload.data }
      default:
         return state;
   }
}