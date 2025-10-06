import {
  CHANGE_RECEIPT_SETTLEMENTS_STATUS_FAILURE,
  CHANGE_RECEIPT_SETTLEMENTS_STATUS_INIT,
  CHANGE_RECEIPT_SETTLEMENTS_STATUS_SUCCESS,
  CLOSE_CHANGE_STATE_RECEIPT_SETTLEMENTS_DIALOG,
  CLOSE_REPORT_RECEIPT_SETTLEMENTS_DIALOG,
  GET_RECEIPT_SETTLEMENTS_FAILURE,
  GET_RECEIPT_SETTLEMENTS_INIT_REQUEST,
  GET_RECEIPT_SETTLEMENTS_SUCCESS,
  GET_REPORT_RECEIPT_SETTLEMENT_FAILURE,
  GET_REPORT_RECEIPT_SETTLEMENT_INIT_REQUEST,
  GET_REPORT_RECEIPT_SETTLEMENT_SUCCESS,
  OPEN_CHANGE_STATE_RECEIPT_SETTLEMENTS_DIALOG,
  OPEN_REPORT_RECEIPT_SETTLEMENTS_DIALOG,
  SET_RECEIPT_SETTLEMENTS_SEARCH_TEXT,
} from '../../types/receipt-settlements/receipt-settlements.types';

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
  reportDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
    loadingDialog: false,
  },
  loading: false,
};

const receiptSettlementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECEIPT_SETTLEMENTS_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_RECEIPT_SETTLEMENTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_RECEIPT_SETTLEMENTS_FAILURE: {
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
    case SET_RECEIPT_SETTLEMENTS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_CHANGE_STATE_RECEIPT_SETTLEMENTS_DIALOG: {
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
    case CLOSE_CHANGE_STATE_RECEIPT_SETTLEMENTS_DIALOG: {
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
    case CHANGE_RECEIPT_SETTLEMENTS_STATUS_INIT: {
      return {
        ...state,
        loading: true,
      };
    }
    case CHANGE_RECEIPT_SETTLEMENTS_STATUS_SUCCESS:
    case CHANGE_RECEIPT_SETTLEMENTS_STATUS_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case OPEN_REPORT_RECEIPT_SETTLEMENTS_DIALOG: {
      return {
        ...state,
        reportDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_REPORT_RECEIPT_SETTLEMENTS_DIALOG: {
      return {
        ...state,
        reportDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case GET_REPORT_RECEIPT_SETTLEMENT_INIT_REQUEST: {
      return {
        ...state,
        reportDialog: {
          ...state.reportDialog,
          loadingDialog: true,
        },
      };
    }
    case GET_REPORT_RECEIPT_SETTLEMENT_SUCCESS: {
      return {
        ...state,
        reportDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.data,
          loadingDialog: false,
        },
      };
    }
    case GET_REPORT_RECEIPT_SETTLEMENT_FAILURE: {
      return {
        ...state,
        reportDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: {
            id: null,
            receipt_settlement_id: action.id,
            client_name: '',
            document_date: '',
            file_num: '',
            header_text: '',
            footer_text: '',
            total: 0,
            details: [],
          },
          loadingDialog: false,
        },
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default receiptSettlementsReducer;
