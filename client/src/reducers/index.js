import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './home_reducer'
import profileReducer from './profile_reducer';

const rootReducer = combineReducers({
   form: formReducer,
   home: homeReducer,
   profile: profileReducer,
});

export default rootReducer;