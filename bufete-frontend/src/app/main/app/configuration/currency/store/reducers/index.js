import { combineReducers } from 'redux';
import currency from './currency.reducer';

const reducer = combineReducers({
  currency,
});

export default reducer;
