import { combineReducers } from 'redux';
import stampInv from './stamp-inv.reducers';
import newStampInv from './new-stamp-inv.reducers';

const reducer = combineReducers({
  stampInv,
  newStampInv,
});

export default reducer;
