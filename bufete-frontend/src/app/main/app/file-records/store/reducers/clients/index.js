import { combineReducers } from 'redux';
import clients from './clients.reducers';
import client from './client.reducers';

const reducer = combineReducers({
  clients,
  client,
});

export default reducer;
