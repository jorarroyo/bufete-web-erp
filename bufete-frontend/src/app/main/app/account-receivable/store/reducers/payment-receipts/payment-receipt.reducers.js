import statusName from 'app/main/shared/StatusName';
import {
  CLOSE_BALANCE_DETAILS_PAYMENT_RECEIPT_DIALOG,
  CLOSE_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
  CREATE_BALANCE_DETAIL_PAYMENT_RECEIPT,
  CREATE_TRANS_DETAIL_PAYMENT_RECEIPT,
  DELETE_BALANCE_DETAILS_PAYMENT_RECEIPT,
  DELETE_TRANS_DETAIL_PAYMENT_RECEIPT,
  EDIT_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
  GET_PAYMENT_BALANCE_FAILURE,
  GET_PAYMENT_BALANCE_INIT_REQUEST,
  GET_PAYMENT_BALANCE_SUCCESS,
  GET_PAYMENT_RECEIPT_FAILURE,
  GET_PAYMENT_RECEIPT_INIT_REQUEST,
  GET_PAYMENT_RECEIPT_SUCCESS,
  NEW_PAYMENT_RECEIPT,
  OPEN_BALANCE_DETAILS_PAYMENT_RECEIPT_DIALOG,
  OPEN_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
  SAVE_PAYMENT_RECEIPT_FAILURE,
  SAVE_PAYMENT_RECEIPT_INIT_REQUEST,
  SAVE_PAYMENT_RECEIPT_SUCCESS,
} from '../../types/payment-receipts/payment-receipt.types';

const initialState = {
  data: null,
  loading: false,
  paymentReceiptDetail: [],
  transDetails: [],
  paymentBalanceDetail: [],
  transactionDetailDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  balanceDetailDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const paymentReceiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_RECEIPT_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
        paymentReceiptDetail: [],
      };
    }
    case GET_PAYMENT_BALANCE_FAILURE:
    case GET_PAYMENT_RECEIPT_FAILURE:
    case SAVE_PAYMENT_RECEIPT_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_PAYMENT_BALANCE_INIT_REQUEST:
    case SAVE_PAYMENT_RECEIPT_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PAYMENT_BALANCE_SUCCESS: {
      const { payload } = action;
      let mergeList = payload.map(s => ({
        ...s,
        detail_id: null,
        to_pay: s.receipt_total,
      }));
      if (state.paymentReceiptDetail && state.paymentReceiptDetail.length > 0) {
        mergeList = payload.map(receipt => {
          const haveEqualId = detail => detail.receipt_id === receipt.id;
          const userWithEqualId = state.paymentReceiptDetail.find(haveEqualId);
          return { ...receipt, ...userWithEqualId };
        });
      }
      return {
        ...state,
        paymentBalanceDetail: mergeList,
        loading: false,
      };
    }
    case SAVE_PAYMENT_RECEIPT_SUCCESS:
    case GET_PAYMENT_RECEIPT_SUCCESS: {
      return {
        ...state,
        data: {
          id: action.payload.id,
          client_id: action.payload.client_id,
          client: {
            id: action.payload.client_id,
            name: action.payload.client_name,
          },
          currency_id: action.payload.currency_id,
          currency: {
            id: action.payload.currency_id,
            name: action.payload.currency_name,
          },
          exchange_rate: action.payload.exchange_rate,
          payment_date: action.payload.payment_date,
          status: action.payload.status,
          total_payment: action.payload.total_payment,
          comments: action.payload.comments,
        },
        paymentReceiptDetail: action.payload.details.map(s => s),
        transDetails: action.payload.transaction_detail_list.map(s => ({
          id: s.id,
          bank_id: s.bank_id,
          bank_name: s.bank_name,
          transaction_type_id: s.transaction_type_id,
          transaction_type_name: s.transaction_type_name,
          status: s.status,
          doc_number: s.doc_number,
          total_transaction: s.total_transaction,
        })),
        loading: false,
      };
    }
    case NEW_PAYMENT_RECEIPT: {
      return {
        ...state,
        data: action.payload,
        paymentReceiptDetail: [],
        transDetails: [],
        paymentBalanceDetail: [],
      };
    }
    case OPEN_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG: {
      return {
        ...state,
        transactionDetailDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case EDIT_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG: {
      return {
        ...state,
        transactionDetailDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG: {
      return {
        ...state,
        transactionDetailDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case CREATE_TRANS_DETAIL_PAYMENT_RECEIPT:
    case DELETE_TRANS_DETAIL_PAYMENT_RECEIPT: {
      const newData = state.transDetails.filter(s => s.id !== action.payload.id);
      return {
        ...state,
        transDetails: [...newData, action.payload],
      };
    }
    case OPEN_BALANCE_DETAILS_PAYMENT_RECEIPT_DIALOG: {
      return {
        ...state,
        balanceDetailDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_BALANCE_DETAILS_PAYMENT_RECEIPT_DIALOG: {
      return {
        ...state,
        balanceDetailDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case CREATE_BALANCE_DETAIL_PAYMENT_RECEIPT: {
      const newDetail = state.paymentReceiptDetail.filter(s => s.receipt_id !== action.payload.id);
      const newBalanceList = state.paymentBalanceDetail.filter(s => s.id !== action.payload.id);
      const balanceModified = state.paymentBalanceDetail.filter(s => s.id === action.payload.id)[0];
      return {
        ...state,
        paymentReceiptDetail: [
          ...newDetail,
          {
            id: action.payload.detail_id,
            receipt_id: action.payload.id,
            payment_balance: action.payload.to_pay,
            status: statusName.ACTIVO,
          },
        ],
        paymentBalanceDetail: [
          ...newBalanceList,
          { ...balanceModified, detail_id: action.payload.detail_id, to_pay: action.payload.to_pay, balance_status: action.payload.balance_status },
        ],
      };
    }
    case DELETE_BALANCE_DETAILS_PAYMENT_RECEIPT: {
      return {
        ...state,
        paymentReceiptDetail: [],
        paymentBalanceDetail: state.paymentBalanceDetail.map(s => ({
          ...s,
          detail_id: null,
          to_pay: 0,
          balance_status: null,
        })),
      };
    }
    default:
      return state;
  }
};

export default paymentReceiptReducer;
