import { combineReducers } from 'redux';
import records from './records.reducers';
import record from './record.reducers';

const reducer = combineReducers({
  records,
  record,
});

export default reducer;
