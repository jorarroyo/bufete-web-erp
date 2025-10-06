import { combineReducers } from 'redux';
import company from './company.reducer';

const reducer = combineReducers({
  company,
});

export default reducer;
