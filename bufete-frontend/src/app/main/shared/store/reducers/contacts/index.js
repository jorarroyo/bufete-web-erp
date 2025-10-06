import { combineReducers } from 'redux';
import contacts from './contacts.reducers';

const reducer = combineReducers({
  contacts,
});

export default reducer;
