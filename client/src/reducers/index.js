import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './home_reducer'
import profileReducer from './profile_reducer';
import editGroupReducer from './edit_group_reducer';
import loginReducer from './login_reducer'
import searchReducer from './search_reducer';
import joinReducer from './join_reducer';
import createAccountReducer from './create_account_reducer'
import createGroupReducer from './create_group_reducer'

const rootReducer = combineReducers({
  form: formReducer,
  home: homeReducer,
  profile: profileReducer,
  editGroup: editGroupReducer,
  login: loginReducer,
  search: searchReducer,
  join: joinReducer,
  createAccount: createAccountReducer,
  createGroup: createGroupReducer
});

export default rootReducer;