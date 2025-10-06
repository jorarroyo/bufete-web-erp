import { combineReducers } from 'redux';
import activity from './activity.reducer';

const reducer = combineReducers({
  activity,
});

export default reducer;
