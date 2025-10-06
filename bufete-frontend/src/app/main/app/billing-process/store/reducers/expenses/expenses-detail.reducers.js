import {
  SET_INITIAL_DATA,
  // eslint-disable-next-line import/named
  CREATE_EXPENSE_DETAILS,
  // eslint-disable-next-line import/named
  OPEN_CREATE_EXPENSE_DETAILS_DIALOG,
  // eslint-disable-next-line import/named
  CLOSE_CREATE_EXPENSE_DETAILS_DIALOG,
  // eslint-disable-next-line import/named
  OPEN_EDIT_EXPENSE_DETAILS_DIALOG,
  // eslint-disable-next-line import/named
  DELETE_EXPENSE_DETAILS,
} from '../../types/expenses/expenses-detail.types';

const initialState = {
  data: null,
  expenseDetailsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: {},
  },
  loading: false,
};

const expensesDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case DELETE_EXPENSE_DETAILS:
    case CREATE_EXPENSE_DETAILS: {
      const newData = state.data.filter(s => s.id !== action.payload.id);
      return {
        ...state,
        data: [...newData, action.payload],
      };
    }
    case OPEN_CREATE_EXPENSE_DETAILS_DIALOG: {
      return {
        ...state,
        expenseDetailsDialog: {
          type: 'new',
          props: {
            open: true,
          },
        },
      };
    }
    case OPEN_EDIT_EXPENSE_DETAILS_DIALOG: {
      return {
        ...state,
        expenseDetailsDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case CLOSE_CREATE_EXPENSE_DETAILS_DIALOG: {
      return {
        ...state,
        expenseDetailsDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: {},
        },
      };
    }
    default:
      return state;
  }
};

export default expensesDetailReducer;
