import { combineReducers } from 'redux';
import receipt from './receipt.reducers';
import receipts from './receipts.reducers';
import receiptsReports from './receipts-reports.reducers';
import receiptOptions from './receipt-options.reducers';

const reducer = combineReducers({
  receipt,
  receipts,
  receiptsReports,
  receiptOptions,
});

export default reducer;
