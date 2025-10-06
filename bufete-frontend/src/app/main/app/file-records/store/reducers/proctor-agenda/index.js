import { combineReducers } from 'redux';
import proctorAgenda from './proctor-agenda.reducers';
import newAgenda from './new-agenda.reducers';

const reducer = combineReducers({
  proctorAgenda,
  newAgenda,
});

export default reducer;
