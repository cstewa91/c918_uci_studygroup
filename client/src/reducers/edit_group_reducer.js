import types from '../actions/types';

const DEFAULT_STATE = {
   singleGroup: {},
   
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_GROUP_DETAILS:
            return { ...state, singleGroup: action.payload.data}
        case types.EDIT_GROUP_INFO:
            return { ...state, single: action.payload.data }
        default:
            return state;
   }
}
