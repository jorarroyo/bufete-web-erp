import { combineReducers } from 'redux';
import activitySettle from './activity-settle.reducers';
import newSettle from './new-settle.reducers';

const reducer = combineReducers({
  activitySettle,
  newSettle,
});

export default reducer;
