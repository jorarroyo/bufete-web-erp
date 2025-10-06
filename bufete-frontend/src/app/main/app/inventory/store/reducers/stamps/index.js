import { combineReducers } from 'redux';
import stamps from './stamps.reducers';

const reducer = combineReducers({
  stamps,
});

export default reducer;
