import { 
  GET_CLIENTS_SUCCESS, 
  GET_CLIENTS_INIT_REQUEST, 
  GET_CLIENTS_FAILURE, 
  SET_CLIENTS_SEARCH_TEXT 
} from '../../types/clients/clients.types';

const initialState = {
  data: [],
  routeParams: {
    page: 0,
    size: 0,
    order: 'desc',
  },
  searchText: '',
  loading: false,
};

const clientsReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_CLIENTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_CLIENTS_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        routeParams: {
          page: 0,
          size: 0,
          order: 'desc',
        },
      };
    }
    case SET_CLIENTS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    default:
      return state;
  }
};

export default clientsReducer;
