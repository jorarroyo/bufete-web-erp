import {
  CLOSE_CREATE_RECEIPT_DIALOG,
  CREATE_RECEIPT,
  DELETE_RECEIPT,
  GET_RECEIPT_FAILURE,
  GET_RECEIPT_INIT_REQUEST,
  GET_RECEIPT_SUCCESS,
  NEW_RECEIPT,
  OPEN_CREATE_RECEIPT_DIALOG,
  OPEN_EDIT_RECEIPT_DIALOG,
  SAVE_RECEIPT_FAILURE,
  SAVE_RECEIPT_INIT_REQUEST,
  SAVE_RECEIPT_SUCCESS,
} from '../../types/receipts/receipt.types';

const initialState = {
  data: null,
  oneTimeClient: null,
  loading: false,
  receiptDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: {},
    isFreeReceipt: true,
  },
  oneTimeClientDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: {},
  },
  receiptDetail: [],
};

const receiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECEIPT_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
        receiptDetail: [],
      };
    }
    case GET_RECEIPT_FAILURE:
    case SAVE_RECEIPT_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case SAVE_RECEIPT_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_RECEIPT_SUCCESS:
    case GET_RECEIPT_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        data: {
          id: payload.id,
          receipt_settlement_id: payload.receipt_settlement_id,
          client_id: payload.one_time_client ? payload.one_time_client.id : payload.client_id,
          client: {
            id: payload.client_id,
            name: payload.client_name,
          },
          currency_id: payload.currency_id,
          receipt_address_id: payload.receipt_address_id || '',
          receipt_date: payload.receipt_date,
          status: payload.status,
          receipt_total: payload.receipt_total,
          receipt_total_discount: payload.receipt_total_discount,
          object_type: payload.object_type,
          is_one_time_client: payload.is_one_time_client,
          client_name: payload.one_time_client ? payload.one_time_client.name : null,
          client_address: payload.one_time_client ? payload.one_time_client.address : null,
          client_nit: payload.one_time_client ? payload.one_time_client.nit : null,
          exchange_rate: payload.exchange_rate,
          details: payload.details,
        },
        receiptDetail: payload.details,
        loading: false,
      };
    }
    case NEW_RECEIPT: {
      return {
        ...state,
        data: action.payload,
        receiptDetail: [],
      };
    }
    case DELETE_RECEIPT:
    case CREATE_RECEIPT: {
      const newData = state.receiptDetail.filter(s => s.id !== action.payload.id);
      return {
        ...state,
        receiptDetail: [...newData, action.payload],
      };
    }
    case OPEN_CREATE_RECEIPT_DIALOG: {
      return {
        ...state,
        receiptDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: {},
          isFreeReceipt: action.isFreeReceipt,
        },
      };
    }
    case OPEN_EDIT_RECEIPT_DIALOG: {
      return {
        ...state,
        receiptDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.payload,
          isFreeReceipt: action.isFreeReceipt,
        },
      };
    }
    case CLOSE_CREATE_RECEIPT_DIALOG: {
      return {
        ...state,
        receiptDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: {},
          isFreeReceipt: true,
        },
      };
    }
    default:
      return state;
  }
};

export default receiptReducer;
