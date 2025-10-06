import {
  CHANGE_PAYMENT_RECEIPT_STATUS_FAILURE,
  CHANGE_PAYMENT_RECEIPT_STATUS_INIT,
  CHANGE_PAYMENT_RECEIPT_STATUS_SUCCESS,
  CLOSE_CHANGE_STATE_PAYMENT_RECEIPT_DIALOG,
  GET_PAYMENT_RECEIPTS_FAILURE,
  GET_PAYMENT_RECEIPTS_INIT_REQUEST,
  GET_PAYMENT_RECEIPTS_SUCCESS,
  OPEN_CHANGE_STATE_PAYMENT_RECEIPT_DIALOG,
  SET_PAYMENT_RECEIPT_SEARCH_TEXT,
} from '../../types/payment-receipts/payment-receipts.types';

const initialState = {
  data: [],
  searchText: '',
  routeParams: {
    page: 0,
    size: 0,
    order: 'desc',
  },
  changeStatusDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  loading: false,
};

const paymentReceiptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_RECEIPTS_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_PAYMENT_RECEIPTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_PAYMENT_RECEIPTS_FAILURE: {
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
    case SET_PAYMENT_RECEIPT_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_CHANGE_STATE_PAYMENT_RECEIPT_DIALOG: {
      return {
        ...state,
        changeStatusDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_CHANGE_STATE_PAYMENT_RECEIPT_DIALOG: {
      return {
        ...state,
        changeStatusDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case CHANGE_PAYMENT_RECEIPT_STATUS_INIT: {
      return {
        ...state,
        loading: true,
      };
    }
    case CHANGE_PAYMENT_RECEIPT_STATUS_SUCCESS:
    case CHANGE_PAYMENT_RECEIPT_STATUS_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default paymentReceiptsReducer;
