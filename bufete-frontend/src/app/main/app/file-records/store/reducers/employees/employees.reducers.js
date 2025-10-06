import {
  GET_EMPLOYEES_INIT_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  SET_EMPLOYEES_SEARCH_TEXT,
} from '../../types/employees/employees.types';

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

const employeesReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_EMPLOYEES_FAILURE: {
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
    case SET_EMPLOYEES_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    default:
      return state;
  }
};

export default employeesReducer;
