import types from '../actions/types';

const DEFAULT_STATE = {
   single_group: {}
   
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_GROUP_DETAILS:
            return { ...state, single_group: action.payload.data}
        case types.EDIT_GROUP_INFO:
            return { ...state, single_group: action.payload.data }
        default:
            return state;
   }
}