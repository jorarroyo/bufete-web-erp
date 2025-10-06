import {
  CLOSE_CREATE_RECEIPT_SETTLEMENT_DIALOG,
  CREATE_RECEIPT_SETTLEMENT,
  DELETE_RECEIPT_SETTLEMENT,
  GET_FEES_RECEIPT_SETTLEMENT_FAILURE,
  GET_FEES_RECEIPT_SETTLEMENT_INIT_REQUEST,
  GET_FEES_RECEIPT_SETTLEMENT_SUCCESS,
  GET_RECEIPT_SETTLEMENT_FAILURE,
  GET_RECEIPT_SETTLEMENT_INIT_REQUEST,
  GET_RECEIPT_SETTLEMENT_SUCCESS,
  NEW_RECEIPT_SETTLEMENT,
  OPEN_CREATE_RECEIPT_SETTLEMENT_DIALOG,
  OPEN_EDIT_RECEIPT_SETTLEMENT_DIALOG,
  SAVE_RECEIPT_SETTLEMENT_FAILURE,
  SAVE_RECEIPT_SETTLEMENT_INIT_REQUEST,
  SAVE_RECEIPT_SETTLEMENT_SUCCESS,
} from '../../types/receipt-settlements/receipt-settlement.types';

const initialState = {
  data: null,
  loading: false,
  fees: {
    attorneys: [],
    activities: [],
    stamps: [],
  },
  receiptSettleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: {},
  },
  receiptSettlementDetail: [],
};

const receiptSettlementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECEIPT_SETTLEMENT_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
        receiptSettlementDetail: [],
      };
    }
    case GET_RECEIPT_SETTLEMENT_FAILURE:
    case SAVE_RECEIPT_SETTLEMENT_FAILURE: {
      return {
        ...state,
        loading: false,
        receiptSettlementDetail: [],
      };
    }
    case SAVE_RECEIPT_SETTLEMENT_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_RECEIPT_SETTLEMENT_SUCCESS:
    case GET_RECEIPT_SETTLEMENT_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        data: {
          id: payload.id,
          client_id: payload.client_id,
          client: {
            id: payload.client_id,
            name: payload.client_name,
          },
          status: payload.status,
          receipt_total: payload.receipt_total,
          type: payload.type,
          attorney_fees_list: payload.attorney_fees_list,
          activity_fees_list: payload.activity_fees_list,
          stamps_fees_list: payload.stamps_fees_list,
          expenses_fees_list: payload.expenses_fees_list,
          receipt_settlement_detail: payload.receipt_settlement_detail,
        },
        receiptSettlementDetail: payload.receipt_settlement_detail,
        loading: false,
      };
    }
    case NEW_RECEIPT_SETTLEMENT: {
      return {
        ...state,
        data: action.payload,
        fees: {
          attorneys: [],
          activities: [],
          stamps: [],
        },
        receiptSettlementDetail: [],
      };
    }
    case GET_FEES_RECEIPT_SETTLEMENT_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
        fees: {
          attorneys: [],
          activities: [],
          stamps: [],
        },
      };
    }
    case GET_FEES_RECEIPT_SETTLEMENT_SUCCESS: {
      return {
        ...state,
        fees: action.payload,
        loading: false,
      };
    }
    case GET_FEES_RECEIPT_SETTLEMENT_FAILURE: {
      return {
        ...state,
        loading: false,
        fees: {
          attorneys: [],
          activities: [],
          stamps: [],
        },
      };
    }
    case DELETE_RECEIPT_SETTLEMENT:
    case CREATE_RECEIPT_SETTLEMENT: {
      const newData = state.receiptSettlementDetail.filter(s => s.id !== action.payload.id);
      return {
        ...state,
        receiptSettlementDetail: [...newData, action.payload],
      };
    }
    case OPEN_CREATE_RECEIPT_SETTLEMENT_DIALOG: {
      return {
        ...state,
        receiptSettleDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: {
            clientId: action.payload,
          },
        },
      };
    }
    case OPEN_EDIT_RECEIPT_SETTLEMENT_DIALOG: {
      return {
        ...state,
        receiptSettleDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case CLOSE_CREATE_RECEIPT_SETTLEMENT_DIALOG: {
      return {
        ...state,
        receiptSettleDialog: {
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

export default receiptSettlementReducer;
