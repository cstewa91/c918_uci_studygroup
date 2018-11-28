import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './home_reducer'
import profileReducer from './profile_reducer';
<<<<<<< HEAD
import editGroupReducer from './edit_group_reducer';
=======
import loginReducer from './login_reducer'
import searchReducer from './search_reducer';
>>>>>>> 781e234505c2145540ca55c97bcecdf5fd33249a

const rootReducer = combineReducers({
   form: formReducer,
   home: homeReducer,
   profile: profileReducer,
<<<<<<< HEAD
   editGroup: editGroupReducer
=======
   login: loginReducer,
   search: searchReducer
>>>>>>> 781e234505c2145540ca55c97bcecdf5fd33249a
});

export default rootReducer;