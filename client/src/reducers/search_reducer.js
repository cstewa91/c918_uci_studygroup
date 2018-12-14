import types from '../actions/types';

const DEFAULT_STATE = {
    selected: {},
    all: []
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_GROUP_DETAILS:
            return { ...state, selected: action.payload.data};
        case types.GET_ALL_GROUPS:
            return { ...state, all: action.payload.data };
        default:
            return state;
    }
}
