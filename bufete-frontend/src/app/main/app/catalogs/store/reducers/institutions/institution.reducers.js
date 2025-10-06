import _ from '@lodash';
import {
  CLOSE_EDIT_INSTITUTION_DIALOG,
  CLOSE_NEW_INSTITUTION_DIALOG,
  GET_INSTITUTIONS_FAILURE,
  GET_INSTITUTIONS_INIT_REQUEST,
  GET_INSTITUTIONS_SUCCESS,
  OPEN_EDIT_INSTITUTION_DIALOG,
  OPEN_NEW_INSTITUTION_DIALOG,
  SET_SEARCH_TEXT,
} from '../../types/institution.types';

const initialState = {
  entities: null,
  searchText: '',
  routeParams: {},
  institutionDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  error: null,
  loading: false,
};

const institutionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INSTITUTIONS_INIT_REQUEST: {
      return {
        ...state,
        entities: null,
        loading: true,
      };
    }
    case GET_INSTITUTIONS_SUCCESS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        routeParams: action.routeParams,
        loading: false,
      };
    }
    case GET_INSTITUTIONS_FAILURE: {
      return {
        ...state,
        entities: null,
        loading: false,
      };
    }
    case SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_NEW_INSTITUTION_DIALOG: {
      return {
        ...state,
        institutionDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case CLOSE_NEW_INSTITUTION_DIALOG: {
      return {
        ...state,
        institutionDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case OPEN_EDIT_INSTITUTION_DIALOG: {
      return {
        ...state,
        institutionDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_EDIT_INSTITUTION_DIALOG: {
      return {
        ...state,
        institutionDialog: {
          type: 'edit',
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

export default institutionReducer;
