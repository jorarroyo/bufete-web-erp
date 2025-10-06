import {
  GET_RECORDS_INIT_REQUEST,
  GET_RECORDS_SUCCESS,
  GET_RECORDS_FAILURE,
  SET_RECORDS_SEARCH_TEXT,
  OPEN_CHANGE_STATE_DIALOG,
  CLOSE_CHANGE_STATE_DIALOG,
  GET_STATUS_FLOW, OPEN_MERGE_RECORD_FILES_DIALOG, CLOSE_MERGE_RECORD_FILES_DIALOG,
} from '../../types/records/records.types';

const initialState = {
  data: [],
  searchText: '',
  routeParams: {
    page: 0,
    size: 0,
    order: 'desc',
  },
  caseRecordDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  statusFlow: [],
  loading: false,
  mergeRecordFileDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const recordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECORDS_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_RECORDS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_RECORDS_FAILURE: {
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
    case SET_RECORDS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_CHANGE_STATE_DIALOG: {
      return {
        ...state,
        caseRecordDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_CHANGE_STATE_DIALOG: {
      return {
        ...state,
        caseRecordDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case GET_STATUS_FLOW: {
      return {
        ...state,
        statusFlow: action.payload,
      };
    }
    case OPEN_MERGE_RECORD_FILES_DIALOG: {
      return {
        ...state,
        mergeRecordFileDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_MERGE_RECORD_FILES_DIALOG: {
      return {
        ...state,
        mergeRecordFileDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    default:
      return state;
  }
};

export default recordsReducer;
