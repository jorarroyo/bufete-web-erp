import { 
  GET_STAMPS_INIT_REQUEST, 
  GET_STAMPS_SUCCESS, 
  GET_STAMPS_FAILURE, 
  SET_STAMPS_SEARCH_CRITERIA,
  OPEN_ADD_STAMPS_DIALOG,
  CLOSE_ADD_STAMPS_DIALOG,
  OPEN_EDIT_STAMPS_DIALOG,
  CLOSE_EDIT_STAMPS_DIALOG,
  GET_PROD_PROPERTY,
  OPEN_STAMP_MOV_DIALOG,
  CLOSE_STAMP_MOV_DIALOG,
  CREATE_STAMP_INIT_REQUEST,
  CREATE_STAMP_SUCCESS,
  CREATE_STAMP_FAILURE,
  GET_STAMP_FAILURE,
  GET_STAMP_INIT_REQUEST,
} from '../../types/stamps/stamps.types';

const initialState = {
  data: [],
  searchText: '',
  routeParams: {
    page: 0,
    size: 0,
    order: 'desc',
  },
  stampsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
    loading: false,
  },
  stampMovDialog: {
    props: {
      open: false,
    },
    data: null,
  },
  loading: false,
};

const stampsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAMPS_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_STAMPS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_STAMPS_FAILURE: {
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
    case GET_STAMP_INIT_REQUEST:
    case CREATE_STAMP_INIT_REQUEST: {
      return {
        ...state,
        stampsDialog: {
          ...state.stampsDialog,
          loading: true,
        },
      };
    }
    case GET_STAMP_FAILURE:
    case CREATE_STAMP_SUCCESS:
    case CREATE_STAMP_FAILURE: {
      return {
        ...state,
        stampsDialog: {
          ...state.stampsDialog,
          loading: false,
        },
      };
    }
    case SET_STAMPS_SEARCH_CRITERIA: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_ADD_STAMPS_DIALOG: {
      return {
        ...state,
        stampsDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.data,
          loading: false,
        },
      };
    }
    case CLOSE_ADD_STAMPS_DIALOG: {
      return {
        ...state,
        stampsDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
          loading: false,
        },
      };
    }
    case OPEN_EDIT_STAMPS_DIALOG: {
      return {
        ...state,
        stampsDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
          loading: false,
        },
      };
    }
    case CLOSE_EDIT_STAMPS_DIALOG: {
      return {
        ...state,
        stampsDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
          loading: false,
        },
      };
    }
    case GET_PROD_PROPERTY: {
      return {
        ...state,
        stampsDialog: {
          ...state.stampsDialog,
          prodProperties: action.payload,
        },
      };
    }
    case OPEN_STAMP_MOV_DIALOG: {
      return {
        ...state,
        stampMovDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case CLOSE_STAMP_MOV_DIALOG: {
      return {
        ...state,
        stampMovDialog: {
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

export default stampsReducer;
