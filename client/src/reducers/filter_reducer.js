import types from '../actions/types';

const DEFAULT_STATE = {
    results: [],
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.FILTER_GROUPS:
            console.log('Filtering Results:', action);
            return { ...state, results: action.payload.data};
        default:
            return state;
    }
}
