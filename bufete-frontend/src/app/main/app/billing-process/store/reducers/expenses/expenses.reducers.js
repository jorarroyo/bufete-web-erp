import {
  GET_EXPENSES_FAILURE,
  GET_EXPENSES_INIT_REQUEST,
  GET_EXPENSES_SUCCESS,
  SET_EXPENSES_SEARCH_TEXT,
  OPEN_CHANGE_STATE_DIALOG,
  CLOSE_CHANGE_STATE_DIALOG
} from '../../types/expenses/expenses.types';

const initialState = {
  data: [],
  searchText: '',
  routeParams: {
    page: 0,
    size: 0,
    order: 'desc',
  },
  caseExpenseDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  loading: false,
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSES_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_EXPENSES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_EXPENSES_FAILURE: {
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
    case SET_EXPENSES_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_CHANGE_STATE_DIALOG: {
      return {
        ...state,
        caseExpenseDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_CHANGE_STATE_DIALOG: {
      return {
        ...state,
        caseExpenseDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    default:
      return state;
  }
};

export default expensesReducer;
