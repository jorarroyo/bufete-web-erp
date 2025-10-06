import { combineReducers } from 'redux';
import institution from './institution.reducers';

const reducer = combineReducers({
  institution,
});

export default reducer;
