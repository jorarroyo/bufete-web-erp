import { combineReducers } from 'redux';
import paymentReceipts from './payment-receipts.reducers';
import paymentReceipt from './payment-receipt.reducers';

const reducer = combineReducers({
  paymentReceipt,
  paymentReceipts,
});

export default reducer;
