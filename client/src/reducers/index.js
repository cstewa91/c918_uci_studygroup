import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './home_reducer'
import profileReducer from './profile_reducer';
import loginReducer from './login_reducer'
import searchReducer from './search_reducer';

const rootReducer = combineReducers({
   form: formReducer,
   home: homeReducer,
   profile: profileReducer,
   login: loginReducer,
   search: searchReducer
});

export default rootReducer;