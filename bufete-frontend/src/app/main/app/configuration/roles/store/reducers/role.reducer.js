import _ from '@lodash';
import {
  CLOSE_EDIT_ROLE_DIALOG,
  CLOSE_NEW_ROLE_DIALOG,
  GET_ROLE,
  GET_ROLES_FAILURE,
  GET_ROLES_INIT_REQUEST,
  GET_ROLES_SUCCESS,
  OPEN_EDIT_ROLE_DIALOG,
  OPEN_NEW_ROLE_DIALOG,
  REMOVE_ROLE_SELECTED,
  SET_SEARCH_TEXT,
} from '../types/role.types';

const initialState = {
  entities: null,
  searchText: '',
  routeParams: {},
  selectedRole: null,
  roleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  loading: false,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES_INIT_REQUEST: {
      return {
        ...state,
        entities: null,
        loading: true,
      };
    }
    case GET_ROLES_SUCCESS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        routeParams: action.routeParams,
        loading: false,
      };
    }
    case GET_ROLES_FAILURE: {
      return {
        ...state,
        entities: null,
        loading: false,
      };
    }
    case GET_ROLE: {
      return {
        ...state,
        selectedRole: action.payload,
      };
    }
    case REMOVE_ROLE_SELECTED: {
      return {
        ...state,
        selectedRole: null,
      };
    }
    case SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_NEW_ROLE_DIALOG: {
      return {
        ...state,
        roleDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case CLOSE_NEW_ROLE_DIALOG: {
      return {
        ...state,
        roleDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case OPEN_EDIT_ROLE_DIALOG: {
      return {
        ...state,
        roleDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_EDIT_ROLE_DIALOG: {
      return {
        ...state,
        roleDialog: {
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

export default roleReducer;
