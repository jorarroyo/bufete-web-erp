import { combineReducers } from 'redux';
import address from './addresses.reducers';
import searchRecords from './search-record-files.reducers';

const reducer = combineReducers({
  address,
  searchRecords,
});

export default reducer;
