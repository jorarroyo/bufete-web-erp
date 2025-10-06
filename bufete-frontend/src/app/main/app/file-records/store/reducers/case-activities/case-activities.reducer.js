import {
  GET_CASE_ACTIVITIES_INIT_REQUEST,
  GET_CASE_ACTIVITIES_SUCCESS,
  GET_CASE_ACTIVITIES_FAILURE,
  SET_CASE_ACTIVITIES_SEARCH_TEXT,
  CREATE_CASE_ACTIVITIES_INIT_REQUEST,
  CREATE_CASE_ACTIVITIES_SUCCESS,
  CREATE_CASE_ACTIVITIES_FAILURE,
  OPEN_NEW_CASE_ACTIVITY_DIALOG,
  CLOSE_NEW_CASE_ACTIVITY_DIALOG,
  OPEN_EDIT_CASE_ACTIVITY_DIALOG,
  CLOSE_EDIT_CASE_ACTIVITY_DIALOG,
  GET_CASE_ACTIVITY_INIT_REQUEST,
  GET_CASE_ACTIVITY_FAILURE,
  REMOVE_CASE_ACTIVITY_INIT_REQUEST,
  REMOVE_CASE_ACTIVITY_SUCCESS,
  REMOVE_CASE_ACTIVITY_FAILURE,
  CLOSE_CHANGE_RECORD_DIALOG,
  OPEN_CHANGE_RECORD_DIALOG,
  UPDATE_RECORD_CASE_ACTIVITIES_INIT_REQUEST,
  UPDATE_RECORD_CASE_ACTIVITIES_FAILURE,
} from '../../types/case-activities/case-activities.types';

const initialState = {
  data: [],
  searchText: '',
  routeParams: {
    page: 0,
    size: 0,
    order: 'desc',
  },
  caseActivityDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
    loading: false,
  },
  changeRecordDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
    loadingDialog: false,
    receiptSettleType: null,
  },
  loading: false,
  recordId: '',
  fileNum: '',
  status: '',
};

const caseActivitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RECORD_CASE_ACTIVITIES_INIT_REQUEST:
    case REMOVE_CASE_ACTIVITY_INIT_REQUEST:
    case GET_CASE_ACTIVITIES_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REMOVE_CASE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_CASE_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        recordId: action.recordId,
        fileNum: action.fileNum,
        status: action.status,
        routeParams: action.routeParams,
      };
    }
    case UPDATE_RECORD_CASE_ACTIVITIES_FAILURE:
    case REMOVE_CASE_ACTIVITY_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_CASE_ACTIVITIES_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        recordId: '',
        fileNum: '',
        status: '',
        routeParams: {
          page: 0,
          size: 0,
          order: 'desc',
        },
      };
    }
    case SET_CASE_ACTIVITIES_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_NEW_CASE_ACTIVITY_DIALOG: {
      return {
        ...state,
        caseActivityDialog: {
          type: action.openType,
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case CLOSE_NEW_CASE_ACTIVITY_DIALOG: {
      return {
        ...state,
        caseActivityDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case OPEN_EDIT_CASE_ACTIVITY_DIALOG: {
      return {
        ...state,
        caseActivityDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
        loading: false,
      };
    }
    case CLOSE_EDIT_CASE_ACTIVITY_DIALOG: {
      return {
        ...state,
        caseActivityDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case GET_CASE_ACTIVITY_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_CASE_ACTIVITY_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case CREATE_CASE_ACTIVITIES_INIT_REQUEST: {
      return {
        ...state,
        caseActivityDialog: {
          ...state.caseActivityDialog,
          loading: true,
        },
        loading: true,
      };
    }
    case CREATE_CASE_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        caseActivityDialog: {
          ...state.caseActivityDialog,
          loading: false,
        },
        loading: false,
      };
    }
    case CREATE_CASE_ACTIVITIES_FAILURE: {
      return {
        ...state,
        caseActivityDialog: {
          ...state.caseActivityDialog,
          loading: false,
        },
        loading: false,
      };
    }
    case OPEN_CHANGE_RECORD_DIALOG: {
      const { data } = action;
      return {
        ...state,
        changeRecordDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: {
            id: data.id,
            file_num: data.file_num,
            file_record_id: data.file_record_id,
          },
          receiptSettleType: data.receiptType,
        },
        loading: false,
      };
    }
    case CLOSE_CHANGE_RECORD_DIALOG: {
      return {
        ...state,
        changeRecordDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
          loadingDialog: false,
        },
      };
    }
    default:
      return state;
  }
};

export default caseActivitiesReducer;
