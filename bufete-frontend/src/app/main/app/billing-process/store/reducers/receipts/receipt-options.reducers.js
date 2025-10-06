import {
  CLOSE_INVOICE_SERIES_RECEIPT_DIALOG,
  CLOSE_PREVIEW_RECEIPT_DIALOG,
  OPEN_INVOICE_SERIES_RECEIPT_DIALOG,
  OPEN_PREVIEW_RECEIPT_DIALOG_FAILURE,
  OPEN_PREVIEW_RECEIPT_DIALOG_INIT,
  OPEN_PREVIEW_RECEIPT_DIALOG_SUCCESS,
  INVOICE_SERIES_INIT_REQUEST,
} from '../../types/receipts/receipt-options.types';

const initialState = {
  invoiceSeriesDialog: {
    type: 'new',
    props: {
      open: false,
    },
    id: null,
    data: null,
  },
  previewReceiptDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const receiptOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INVOICE_SERIES_RECEIPT_DIALOG: {
      return {
        ...state,
        invoiceSeriesDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          id: action.id,
          data: action.payload,
          clientId: action.clientId,
          object_type: action.object_type,
        },
        loading: false,
      };
    }
    case CLOSE_INVOICE_SERIES_RECEIPT_DIALOG: {
      return {
        ...state,
        invoiceSeriesDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          id: null,
          data: null,
        },
      };
    }
    case OPEN_PREVIEW_RECEIPT_DIALOG_FAILURE:
    case CLOSE_PREVIEW_RECEIPT_DIALOG: {
      return {
        ...state,
        previewReceiptDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
        loading: false,
      };
    }
    case OPEN_PREVIEW_RECEIPT_DIALOG_INIT: {
      return {
        ...state,
        previewReceiptDialog: {
          ...state.previewReceiptDialog,
          data: null,
        },
        loading: true,
      };
    }
    case OPEN_PREVIEW_RECEIPT_DIALOG_SUCCESS: {
      return {
        ...state,
        previewReceiptDialog: {
          ...state.previewReceiptDialog,
          props: {
            open: true,
          },
          data: action.payload,
        },
        loading: false,
      };
    }
    case INVOICE_SERIES_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default receiptOptionsReducer;
