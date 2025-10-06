import {
  RECEIPT_REPORT_FAILURE,
  RECEIPT_REPORT_INIT_REQUEST,
  RECEIPT_REPORT_SUCCESS,
} from '../../types/receipts/receipts-reports.types';

const initialState = {
  receiptReportList: null,
  loading: false,
};

const receiptsReportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIPT_REPORT_INIT_REQUEST: {
      return {
        ...state,
        receiptReportList: null,
        loading: true,
      };
    }
    case RECEIPT_REPORT_FAILURE: {
      return {
        ...state,
        receiptReportList: null,
        loading: false,
      };
    }
    case RECEIPT_REPORT_SUCCESS: {
      return {
        ...state,
        receiptReportList: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default receiptsReportsReducer;
