import { combineReducers } from 'redux';
import nomenclatures from './nomenclatures.reducers';

const reducer = combineReducers({
  nomenclatures,
});

export default reducer;
