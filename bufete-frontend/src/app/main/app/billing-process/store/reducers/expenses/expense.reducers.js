import {
  GET_EXPENSE_FAILURE,
  GET_EXPENSE_INIT_REQUEST,
  GET_EXPENSE_SUCCESS,
  NEW_EXPENSE,
  SAVE_EXPENSE_FAILURE,
  SAVE_EXPENSE_INIT_REQUEST,
  SAVE_EXPENSE_SUCCESS,
} from '../../types/expenses/expense.types';
import {
  CLOSE_CREATE_EXPENSE_DETAILS_DIALOG,
  CREATE_EXPENSE_DETAILS,
  DELETE_EXPENSE_DETAILS,
  OPEN_CREATE_EXPENSE_DETAILS_DIALOG,
  OPEN_BULK_EXPENSE_DETAILS_DIALOG,
  OPEN_EDIT_EXPENSE_DETAILS_DIALOG,
  CLOSE_BULK_EXPENSE_DETAILS_DIALOG, GET_FILE_RECORDS_BY_TIMEFRAME_SUCCESS,
} from '../../types/expenses/expenses-detail.types';

const initialState = {
  data: null,
  loading: false,
  expenseDetailsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: {},
  },
  bulkExpenseDetailsDialog: {
    props: {
      open: false,
    },
    file_record: {},
    data: {},
  },
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSE_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
      };
    }
    case GET_EXPENSE_FAILURE:
    case SAVE_EXPENSE_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case SAVE_EXPENSE_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_EXPENSE_SUCCESS:
    case GET_EXPENSE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        data: {
          id: payload.id,
          expenses_date: payload.expenses_date,
          expenses_type: payload.expenses_type,
          expenses_num: payload.expenses_num,
          provider_id: payload.provider_id,
          provider: {
            id: payload.provider_id,
            name: payload.provider_name,
          },
          concept_id: payload.concept_id,
          concept: {
            id: payload.concept_id,
            name: payload.concept_name,
          },
          status: payload.status,
          exchange_rate: payload.exchange_rate,
          expenses_currency: payload.expenses_currency,
          expenses_total: payload.expenses_total,
          details: payload.details,
        },
        loading: false,
      };
    }
    case NEW_EXPENSE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case DELETE_EXPENSE_DETAILS:
    case CREATE_EXPENSE_DETAILS: {
      const newData = state.data.details.filter(s => s.id !== action.payload.id);
      return {
        ...state,
        data: {
          ...state.data,
          details: [...newData, action.payload]
        },
      };
    }
    case OPEN_BULK_EXPENSE_DETAILS_DIALOG: {
      return {
        ...state,
        bulkExpenseDetailsDialog: {
          props: {
            open: true,
          },
        },
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
    case CLOSE_BULK_EXPENSE_DETAILS_DIALOG: {
      return {
        ...state,
        bulkExpenseDetailsDialog: {
          props: {
            open: false,
          },
          data: {},
        },
      };
    }
    case GET_FILE_RECORDS_BY_TIMEFRAME_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        bulkExpenseDetailsDialog: {
          props: {
            open: false,
          },
          file_records :[
            ...payload
          ],
          data: {},
        },
      };
    }
    default:
      return state;
  }
};

export default expenseReducer;
