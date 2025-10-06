import { combineReducers } from 'redux';
import caseActivities from './case-activities.reducer';

const reducer = combineReducers({
  caseActivities,
});

export default reducer;
