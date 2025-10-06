import { combineReducers } from 'redux';
import expenses from './expenses.reducers';
// import expenseDetails from './expenses-detail.reducers';
import expense from './expense.reducers';

const reducer = combineReducers({
  expenses,
  expense,
  // expenseDetails,
});

export default reducer;
