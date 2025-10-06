import {
  CHANGE_RECEIPT_STATUS_FAILURE,
  CHANGE_RECEIPT_STATUS_INIT,
  CHANGE_RECEIPT_STATUS_SUCCESS,
  CLOSE_CHANGE_STATE_RECEIPT_DIALOG,
  CLOSE_PREVIEW_DOC_RECEIPT_DIALOG,
  GET_RECEIPT_FAILURE,
  GET_RECEIPT_INIT_REQUEST,
  GET_RECEIPT_SUCCESS,
  OPEN_CHANGE_STATE_RECEIPT_DIALOG,
  OPEN_PREVIEW_DOC_RECEIPT_DIALOG,
  PREVIEW_DOC_FAILURE,
  PREVIEW_DOC_INIT_REQUEST,
  SET_RECEIPT_SEARCH_TEXT,
} from '../../types/receipts/receipts.types';

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
  previewDocDialog: {
    type: 'new',
    props: {
      open: false,
    },
    id: null,
    data: null,
  },
  loading: false,
};

const receiptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECEIPT_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_RECEIPT_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_RECEIPT_FAILURE: {
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
    case SET_RECEIPT_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_CHANGE_STATE_RECEIPT_DIALOG: {
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
    case CLOSE_CHANGE_STATE_RECEIPT_DIALOG: {
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
    case OPEN_PREVIEW_DOC_RECEIPT_DIALOG: {
      return {
        ...state,
        previewDocDialog: {
          ...state.previewDocDialog,
          type: 'new',
          props: {
            open: true,
          },
          id: action.id,
          data: action.data[0],
        },
        loading: false,
      };
    }
    case CLOSE_PREVIEW_DOC_RECEIPT_DIALOG: {
      return {
        ...state,
        previewDocDialog: {
          type: 'new',
          props: {
            open: false,
          },
          id: null,
          data: null,
        },
        loading: false,
      };
    }
    case PREVIEW_DOC_INIT_REQUEST: {
      return {
        ...state,
        previewDocDialog: {
          ...state.previewDocDialog,
        },
        loading: true,
      };
    }
    case PREVIEW_DOC_FAILURE: {
      return {
        ...state,
        previewDocDialog: {
          ...state.previewDocDialog,
          id: null,
          data: null,
        },
        loading: false,
      };
    }
    case CHANGE_RECEIPT_STATUS_INIT: {
      return {
        ...state,
        loading: true,
      };
    }
    case CHANGE_RECEIPT_STATUS_SUCCESS:
    case CHANGE_RECEIPT_STATUS_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default receiptsReducer;
