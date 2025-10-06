import _ from '@lodash';
import {
  GET_USER_SUCCESS,
  CLOSE_EDIT_ASSIGN_DIALOG,
  CLOSE_EDIT_USER_DIALOG,
  CLOSE_NEW_USER_DIALOG,
  CLOSE_RESET_PASS_DIALOG,
  GET_USERS_FAILURE,
  GET_USERS_INIT_REQUEST,
  GET_USERS_SUCCESS,
  OPEN_EDIT_ASSIGN_DIALOG,
  OPEN_EDIT_USER_DIALOG,
  OPEN_NEW_USER_DIALOG,
  OPEN_RESET_PASS_DIALOG,
  REMOVE_USER_SELECTED,
  SET_SEARCH_TEXT,
} from '../types/user.types';

const initialState = {
  entities: null,
  searchText: '',
  routeParams: {},
  selectedUser: null,
  userDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  userAssignDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
    userId: null,
  },
  userResetPassDialog: {
    props: {
      open: false,
    },
    userId: null,
  },
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_INIT_REQUEST: {
      return {
        ...state,
        entities: null,
        loading: true,
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        routeParams: action.routeParams,
        loading: false,
      };
    }
    case GET_USERS_FAILURE: {
      return {
        ...state,
        entities: null,
        loading: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }
    case REMOVE_USER_SELECTED: {
      return {
        ...state,
        selectedUser: null,
      };
    }
    case SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_NEW_USER_DIALOG: {
      return {
        ...state,
        userDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case CLOSE_NEW_USER_DIALOG: {
      return {
        ...state,
        userDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case OPEN_EDIT_USER_DIALOG: {
      return {
        ...state,
        userDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_EDIT_USER_DIALOG: {
      return {
        ...state,
        userDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case OPEN_EDIT_ASSIGN_DIALOG: {
      return {
        ...state,
        userAssignDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.payload.data,
          userId: action.payload.userId,
        },
      };
    }
    case CLOSE_EDIT_ASSIGN_DIALOG: {
      return {
        ...state,
        userAssignDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
          userId: null,
        },
      };
    }
    case OPEN_RESET_PASS_DIALOG: {
      return {
        ...state,
        userResetPassDialog: {
          props: {
            open: true,
          },
          userId: action.payload,
        },
      };
    }
    case CLOSE_RESET_PASS_DIALOG: {
      return {
        ...state,
        userResetPassDialog: {
          props: {
            open: false,
          },
          userId: null,
        },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
