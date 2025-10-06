import { combineReducers } from 'redux';
import receiptSettlements from './receipt-settlements.reducers';
import receiptSettlement from './receipt-settlement.reducers';

const reducer = combineReducers({
  receiptSettlements,
  receiptSettlement,
});

export default reducer;
