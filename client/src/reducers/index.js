import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './home_reducer'


const rootReducer = combineReducers({
   form: formReducer,
   home: homeReducer,
});

export default rootReducer;