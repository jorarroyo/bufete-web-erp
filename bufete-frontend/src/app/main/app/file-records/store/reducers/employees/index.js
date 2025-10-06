import { combineReducers } from 'redux';
import employees from './employees.reducers';
import employee from './employee.reducers';

const reducer = combineReducers({
  employees,
  employee,
});

export default reducer;
